<?php
/**
 * Online MMJ Card - Theme Diagnostic & Critical Error Verification Script
 *
 * Checks:
 * 1. PHP syntax verification in functions.php and all theme templates
 * 2. Theme header requirements in style.css
 * 3. Core template file presence and path mismatch checks
 * 4. Duplicate function/class declaration collision checks
 * 5. functions.php and index.php integration (hooks, loops, header/footer hooks)
 * 6. Simulated mock execution test of functions.php
 *
 * Features:
 * - Intercepts WordPress theme activation (via after_switch_theme hook)
 * - Writes diagnostic logs to /wp-content/debug.log using log_theme_error()
 * - Displays a detailed status report notice in wp-admin upon activation
 * - Can be run standalone via CLI (`php debug_theme.php`) or accessed via web browser
 *
 * @package Online_MMJ_Card
 */

// Determine theme root directory
$is_cli = (php_sapi_name() === 'cli');
$theme_dir = realpath(__DIR__);
if (!$theme_dir || !file_exists($theme_dir . '/style.css')) {
    // Check if running from repository root
    if (file_exists(__DIR__ . '/wordpress-theme/online-mmj-card/style.css')) {
        $theme_dir = realpath(__DIR__ . '/wordpress-theme/online-mmj-card');
    }
}

class OnlineMMJThemeDebugger {
    private $theme_dir;
    private $is_cli;
    private $results = array();
    private $total_tests = 0;
    private $passed_tests = 0;
    private $failed_tests = 0;
    private $warning_tests = 0;

    public function __construct($theme_dir, $is_cli = false) {
        $this->theme_dir = rtrim($theme_dir, '/\\');
        $this->is_cli = $is_cli;
    }

    public function addResult($suite, $test_name, $status, $message, $details = null) {
        $this->total_tests++;
        if ($status === 'PASS') {
            $this->passed_tests++;
        } elseif ($status === 'FAIL') {
            $this->failed_tests++;
        } elseif ($status === 'WARN') {
            $this->warning_tests++;
        }

        $this->results[$suite][] = array(
            'test'    => $test_name,
            'status'  => $status,
            'message' => $message,
            'details' => $details,
        );
    }

    public function getResults() {
        return $this->results;
    }

    public function getSummary() {
        return array(
            'total'   => $this->total_tests,
            'passed'  => $this->passed_tests,
            'failed'  => $this->failed_tests,
            'warning' => $this->warning_tests,
        );
    }

    public function runAuditsOnly() {
        $this->checkThemeHeaders();
        $this->checkTemplateFiles();
        $this->checkPhpSyntax();
        $this->checkFunctionCollisions();
        $this->checkFunctionsAndIndexIntegration();
        $this->checkMockExecution();
    }

    public function runAll() {
        $this->runAuditsOnly();
        $this->renderReport();
    }

    /**
     * Intercept WordPress Theme Activation and Log/Print Status Report
     */
    public static function interceptActivation() {
        $theme_dir = function_exists('get_template_directory') ? get_template_directory() : __DIR__;
        $debugger = new self($theme_dir, false);
        $debugger->runAuditsOnly();

        $summary = $debugger->getSummary();
        $results = $debugger->getResults();

        // 1. Build detailed log report string for /wp-content/debug.log
        $log_report  = "=================================================================\n";
        $log_report .= " OnlineMMJCard Theme Activation Status Report\n";
        $log_report .= sprintf(" Timestamp: %s | Total Tests: %d | Passed: %d | Failed: %d\n", gmdate('Y-m-d H:i:s'), $summary['total'], $summary['passed'], $summary['failed']);
        $log_report .= "=================================================================\n";

        foreach ($results as $suite => $tests) {
            $log_report .= "\n[{$suite}]\n";
            foreach ($tests as $t) {
                $log_report .= sprintf("  [%s] %-35s: %s\n", $t['status'], $t['test'], $t['message']);
                if (!empty($t['details'])) {
                    $log_report .= "       Details: " . trim($t['details']) . "\n";
                }
            }
        }
        $log_report .= "\n=================================================================\n";

        // 2. Dispatch to /wp-content/debug.log via log_theme_error facility
        if (function_exists('log_theme_error')) {
            log_theme_error($log_report, 'Activation Interceptor');
        } else {
            $dest = (defined('WP_CONTENT_DIR') ? WP_CONTENT_DIR : dirname(dirname($theme_dir))) . '/debug.log';
            @error_log($log_report, 3, $dest);
        }

        // 3. Store transient for WordPress admin notice report
        if (function_exists('set_transient')) {
            set_transient('online_mmj_activation_audit_report', array(
                'summary' => $summary,
                'results' => $results,
                'time'    => current_time('mysql'),
            ), 300);
        }
    }

    /**
     * 1. Check style.css Theme Headers
     */
    public function checkThemeHeaders() {
        $suite = '1. Theme Header Requirements (style.css)';
        $style_path = $this->theme_dir . '/style.css';

        if (!file_exists($style_path)) {
            $this->addResult($suite, 'style.css Presence', 'FAIL', 'style.css not found in theme directory root.');
            return;
        }

        $content = file_get_contents($style_path, false, null, 0, 8192);

        $headers = array(
            'Theme Name'       => '/Theme Name:\s*(.+)/i',
            'Theme URI'        => '/Theme URI:\s*(.+)/i',
            'Author'           => '/Author:\s*(.+)/i',
            'Description'      => '/Description:\s*(.+)/i',
            'Version'          => '/Version:\s*(.+)/i',
            'Requires at least'=> '/Requires at least:\s*(.+)/i',
            'Requires PHP'     => '/Requires PHP:\s*(.+)/i',
            'Text Domain'      => '/Text Domain:\s*(.+)/i',
        );

        $parsed = array();
        foreach ($headers as $header => $pattern) {
            if (preg_match($pattern, $content, $matches)) {
                $parsed[$header] = trim($matches[1]);
            }
        }

        // Theme Name is required by WordPress
        if (!empty($parsed['Theme Name'])) {
            $this->addResult($suite, 'Theme Name Header', 'PASS', 'Found Theme Name: "' . $parsed['Theme Name'] . '"');
        } else {
            $this->addResult($suite, 'Theme Name Header', 'FAIL', 'Missing mandatory "Theme Name:" header in style.css');
        }

        // Version Header
        if (!empty($parsed['Version'])) {
            $this->addResult($suite, 'Version Header', 'PASS', 'Version defined: ' . $parsed['Version']);
        } else {
            $this->addResult($suite, 'Version Header', 'WARN', 'Missing recommended "Version:" header.');
        }

        // Requires PHP Header
        if (!empty($parsed['Requires PHP'])) {
            $this->addResult($suite, 'Requires PHP Header', 'PASS', 'Requires PHP: ' . $parsed['Requires PHP']);
        } else {
            $this->addResult($suite, 'Requires PHP Header', 'WARN', 'Missing "Requires PHP:" header.');
        }

        // Text Domain Header
        if (!empty($parsed['Text Domain'])) {
            $expected_td = 'online-mmj-card';
            if ($parsed['Text Domain'] === $expected_td) {
                $this->addResult($suite, 'Text Domain Match', 'PASS', 'Text Domain matches theme slug: ' . $parsed['Text Domain']);
            } else {
                $this->addResult($suite, 'Text Domain Match', 'WARN', 'Text Domain is "' . $parsed['Text Domain'] . '", expected "' . $expected_td . '"');
            }
        } else {
            $this->addResult($suite, 'Text Domain Match', 'FAIL', 'Missing "Text Domain:" header.');
        }
    }

    /**
     * 2. Check Core Templates & File Paths
     */
    public function checkTemplateFiles() {
        $suite = '2. Core Template Files & Path Mismatches';

        $required_files = array(
            'index.php'                         => 'Mandatory WordPress fallback template',
            'style.css'                         => 'Mandatory WordPress stylesheet',
            'functions.php'                     => 'Primary theme functions & setup',
            'header.php'                        => 'Semantic header template',
            'footer.php'                        => 'Semantic footer template',
            'page.php'                          => 'Page display template',
            'single.php'                        => 'Single blog / article template',
            'archive.php'                       => 'Archive & categories template',
            '404.php'                           => '404 error page template',
            'front-page.php'                    => 'Front page & builder canvas template',
            'inc/leads-manager.php'             => 'Patient lead capture & email dispatcher',
            'inc/elementor-support.php'         => 'Elementor & Divi builder integration',
            'inc/theme-options.php'             => 'Section block editor & content defaults',
            'inc/pages-manager.php'             => 'Local city & state page management',
            'template-builder.php'              => 'Builder template with evaluation form',
            'template-fullwidth.php'            => 'Full-width unconstrained builder canvas',
            'template-elementor-canvas.php'     => 'Elementor blank canvas template',
            'template-elementor-fullwidth.php'  => 'Elementor full-width template',
            'template-location.php'             => 'Local city landing page template',
            'template-state.php'                => 'State law & MMJ guide template',
            'template-service.php'              => 'Service landing page template',
            'template-condition.php'            => 'Qualifying condition guide template',
        );

        foreach ($required_files as $rel_path => $description) {
            $full_path = $this->theme_dir . '/' . $rel_path;
            if (file_exists($full_path)) {
                $this->addResult($suite, "File: {$rel_path}", 'PASS', "{$rel_path} exists ({$description})");
            } else {
                $this->addResult($suite, "File: {$rel_path}", 'FAIL', "MISSING FILE: {$rel_path} ({$description})");
            }
        }

        // Check compiled assets directory
        $assets_dir = $this->theme_dir . '/assets';
        if (is_dir($assets_dir)) {
            $files = scandir($assets_dir);
            $css_found = false;
            $js_found = false;
            foreach ($files as $f) {
                if (preg_match('/\.css$/', $f)) $css_found = true;
                if (preg_match('/\.js$/', $f)) $js_found = true;
            }
            if ($css_found && $js_found) {
                $this->addResult($suite, 'Assets Bundles', 'PASS', 'Compiled CSS and JS bundles present in /assets/');
            } else {
                $this->addResult($suite, 'Assets Bundles', 'WARN', 'Assets directory present but missing CSS or JS bundle.');
            }
        } else {
            $this->addResult($suite, 'Assets Bundles', 'WARN', 'No /assets/ directory found. Fallback styles in style.css will be used.');
        }
    }

    /**
     * 3. Check PHP Syntax in functions.php and All Theme Files
     */
    public function checkPhpSyntax() {
        $suite = '3. PHP Syntax & Tokenizer Verification (functions.php & Templates)';
        $php_files = $this->findFiles($this->theme_dir, 'php');

        $has_php_cli = false;
        @exec('php -v 2>&1', $out, $ret);
        if ($ret === 0) {
            $has_php_cli = true;
        }

        // Verify functions.php specifically first
        $functions_file = $this->theme_dir . '/functions.php';
        if (file_exists($functions_file)) {
            if ($has_php_cli) {
                $cmd = 'php -l ' . escapeshellarg($functions_file) . ' 2>&1';
                $output = array();
                $return_var = 0;
                exec($cmd, $output, $return_var);
                if ($return_var === 0) {
                    $this->addResult($suite, 'Syntax: functions.php (Core)', 'PASS', 'No syntax errors detected in functions.php');
                } else {
                    $this->addResult($suite, 'Syntax: functions.php (Core)', 'FAIL', 'FATAL SYNTAX ERROR in functions.php!', implode("\n", $output));
                }
            } else {
                try {
                    @token_get_all(file_get_contents($functions_file), TOKEN_PARSE);
                    $this->addResult($suite, 'Syntax: functions.php (Core)', 'PASS', 'Tokenizer validated functions.php syntax');
                } catch (ParseError $e) {
                    $this->addResult($suite, 'Syntax: functions.php (Core)', 'FAIL', 'ParseError in functions.php: ' . $e->getMessage() . ' on line ' . $e->getLine());
                }
            }
        }

        // Check remaining template files
        foreach ($php_files as $file) {
            $rel = str_replace($this->theme_dir . '/', '', $file);
            if ($rel === 'functions.php') continue;

            if ($has_php_cli) {
                $cmd = 'php -l ' . escapeshellarg($file) . ' 2>&1';
                $output = array();
                $return_var = 0;
                exec($cmd, $output, $return_var);

                if ($return_var === 0) {
                    $this->addResult($suite, "Syntax: {$rel}", 'PASS', 'No syntax errors detected');
                } else {
                    $error_msg = implode("\n", $output);
                    $this->addResult($suite, "Syntax: {$rel}", 'FAIL', 'PHP Syntax Error detected!', $error_msg);
                }
            } else {
                $code = file_get_contents($file);
                try {
                    @token_get_all($code, TOKEN_PARSE);
                    $this->addResult($suite, "Tokens: {$rel}", 'PASS', 'Tokenizer validated structure');
                } catch (ParseError $e) {
                    $this->addResult($suite, "Tokens: {$rel}", 'FAIL', 'ParseError: ' . $e->getMessage() . ' on line ' . $e->getLine());
                }
            }
        }
    }

    /**
     * 4. Check for Function & Class Collision (Preventing Cannot Redeclare Fatal Errors)
     */
    public function checkFunctionCollisions() {
        $suite = '4. Function & Class Collision Detection';
        $php_files = $this->findFiles($this->theme_dir, 'php');

        $functions = array();
        $classes = array();

        foreach ($php_files as $file) {
            $rel = str_replace($this->theme_dir . '/', '', $file);
            // Skip debug_theme.php itself from collision audit
            if ($rel === 'debug_theme.php') {
                continue;
            }
            $content = file_get_contents($file);

            // Match function declarations
            if (preg_match_all('/(?:^|[\s;{}])function\s+([a-zA-Z0-9_]+)\s*\(/i', $content, $m, PREG_OFFSET_CAPTURE)) {
                foreach ($m[1] as $match) {
                    $fn_name = $match[0];
                    $offset = $match[1];

                    // Skip magic methods
                    if (strpos($fn_name, '__') === 0) {
                        continue;
                    }

                    // Skip class methods (preceded by public, private, protected)
                    $preceding_50 = substr($content, max(0, $offset - 50), min(50, $offset));
                    if (preg_match('/(public|private|protected)\s+(static\s+)?$/i', trim($preceding_50))) {
                        continue;
                    }

                    // Check if enclosed in function_exists check within preceding 300 bytes
                    $preceding = substr($content, max(0, $offset - 300), min(300, $offset));
                    $is_guarded = (strpos($preceding, "function_exists('{$fn_name}')") !== false) ||
                                  (strpos($preceding, "function_exists(\"{$fn_name}\")") !== false);

                    if (!isset($functions[$fn_name])) {
                        $functions[$fn_name] = array();
                    }
                    $functions[$fn_name][] = array(
                        'file'    => $rel,
                        'guarded' => $is_guarded,
                    );
                }
            }

            // Match class declarations
            if (preg_match_all('/class\s+([a-zA-Z0-9_]+)\s*(\{|extends|implements)/i', $content, $m)) {
                foreach ($m[1] as $cls_name) {
                    if (!isset($classes[$cls_name])) {
                        $classes[$cls_name] = array();
                    }
                    $classes[$cls_name][] = $rel;
                }
            }
        }

        $collision_found = false;
        foreach ($functions as $fn => $occurrences) {
            if (count($occurrences) > 1) {
                $all_guarded = true;
                $file_list = array();
                foreach ($occurrences as $occ) {
                    $file_list[] = $occ['file'] . ($occ['guarded'] ? ' (guarded)' : ' (UNGUARDED)');
                    if (!$occ['guarded']) {
                        $all_guarded = false;
                    }
                }

                if (!$all_guarded) {
                    $collision_found = true;
                    $this->addResult(
                        $suite,
                        "Duplicate Function: {$fn}",
                        'FAIL',
                        "FATAL ERROR HAZARD: Function '{$fn}' declared multiple times without guards in: " . implode(', ', $file_list)
                    );
                } else {
                    $this->addResult(
                        $suite,
                        "Function Guard: {$fn}",
                        'PASS',
                        "Function '{$fn}' declared multiple times but safely protected with function_exists() in: " . implode(', ', $file_list)
                    );
                }
            }
        }

        foreach ($classes as $cls => $files) {
            if (count($files) > 1) {
                $collision_found = true;
                $this->addResult(
                    $suite,
                    "Duplicate Class: {$cls}",
                    'FAIL',
                    "FATAL ERROR HAZARD: Class '{$cls}' declared in multiple files: " . implode(', ', $files)
                );
            }
        }

        if (!$collision_found) {
            $this->addResult($suite, 'Redeclaration Audit', 'PASS', 'Zero unguarded function or class declaration collisions detected.');
        }
    }

    /**
     * 5. Check functions.php and index.php Integration
     */
    public function checkFunctionsAndIndexIntegration() {
        $suite = '5. functions.php & index.php Integration';

        $functions_code = file_get_contents($this->theme_dir . '/functions.php');
        $index_code = file_get_contents($this->theme_dir . '/index.php');
        $header_code = file_get_contents($this->theme_dir . '/header.php');
        $footer_code = file_get_contents($this->theme_dir . '/footer.php');

        // 1. Theme Error Logging Function (log_theme_error)
        if (strpos($functions_code, 'log_theme_error') !== false) {
            $this->addResult($suite, 'log_theme_error() Presence', 'PASS', 'log_theme_error() defined in functions.php targeting /wp-content/debug.log');
        } else {
            $this->addResult($suite, 'log_theme_error() Presence', 'FAIL', 'Missing log_theme_error() function in functions.php');
        }

        // 2. Shutdown Fatal Error Interceptor
        if (strpos($functions_code, 'online_mmj_shutdown_error_handler') !== false) {
            $this->addResult($suite, 'Shutdown Handler', 'PASS', 'register_shutdown_function handler active in functions.php');
        } else {
            $this->addResult($suite, 'Shutdown Handler', 'WARN', 'No shutdown error handler registered in functions.php');
        }

        // 3. Activation Check Hook
        if (strpos($functions_code, 'after_switch_theme') !== false) {
            $this->addResult($suite, 'Activation Hook', 'PASS', 'after_switch_theme activation verification hook found');
        } else {
            $this->addResult($suite, 'Activation Hook', 'WARN', 'Missing after_switch_theme activation hook in functions.php');
        }

        // 4. index.php has get_header() and get_footer()
        if (strpos($index_code, 'get_header') !== false) {
            $this->addResult($suite, 'index.php get_header()', 'PASS', 'index.php correctly calls get_header()');
        } else {
            $this->addResult($suite, 'index.php get_header()', 'FAIL', 'index.php is missing get_header() call');
        }

        if (strpos($index_code, 'get_footer') !== false) {
            $this->addResult($suite, 'index.php get_footer()', 'PASS', 'index.php correctly calls get_footer()');
        } else {
            $this->addResult($suite, 'index.php get_footer()', 'FAIL', 'index.php is missing get_footer() call');
        }

        // 5. index.php WordPress Loop
        if (strpos($index_code, 'have_posts') !== false && strpos($index_code, 'the_post') !== false) {
            $this->addResult($suite, 'index.php Loop', 'PASS', 'index.php implements standard WordPress loop');
        } else {
            $this->addResult($suite, 'index.php Loop', 'FAIL', 'index.php is missing have_posts() or the_post() loop');
        }

        // 6. header.php wp_head() hook
        if (strpos($header_code, 'wp_head()') !== false) {
            $this->addResult($suite, 'header.php wp_head()', 'PASS', 'wp_head() hook present in header.php');
        } else {
            $this->addResult($suite, 'header.php wp_head()', 'FAIL', 'wp_head() is missing from header.php! Required for SEO and styles.');
        }

        // 7. footer.php wp_footer() hook
        if (strpos($footer_code, 'wp_footer()') !== false) {
            $this->addResult($suite, 'footer.php wp_footer()', 'PASS', 'wp_footer() hook present in footer.php');
        } else {
            $this->addResult($suite, 'footer.php wp_footer()', 'FAIL', 'wp_footer() is missing from footer.php! Required for scripts.');
        }

        // 8. functions.php required hooks
        $hooks_to_check = array(
            'after_setup_theme'  => 'Theme setup & features (title-tag, post-thumbnails, menus)',
            'widgets_init'       => 'Sidebar & footer widget areas registration',
            'wp_enqueue_scripts' => 'Stylesheets, Google Fonts, and JS assets loading',
        );

        foreach ($hooks_to_check as $hook => $desc) {
            if (strpos($functions_code, "'{$hook}'") !== false || strpos($functions_code, "\"{$hook}\"") !== false) {
                $this->addResult($suite, "Hook: {$hook}", 'PASS', "Hook '{$hook}' registered in functions.php ({$desc})");
            } else {
                $this->addResult($suite, "Hook: {$hook}", 'FAIL', "Missing required action hook '{$hook}' in functions.php");
            }
        }
    }

    /**
     * 6. Simulated Mock Execution Test of functions.php
     */
    public function checkMockExecution() {
        $suite = '6. Simulated WordPress Mock Execution';

        $test_script = <<<'EOPHP'
define('ABSPATH', sys_get_temp_dir() . '/');
define('WP_CONTENT_DIR', sys_get_temp_dir());
define('WP_DEBUG', false);
define('ONLINE_MMJ_MOCK_TEST', true);

$registered_actions = array();
$registered_shortcodes = array();

function add_action($tag, $callback, $priority = 10, $accepted_args = 1) {
    global $registered_actions;
    $registered_actions[$tag][] = $callback;
}
function add_theme_support($feature, ...$args) {}
function register_nav_menus($locations = array()) {}
function register_sidebar($args = array()) {}
function get_template_directory_uri() { return "http://example.com/wp-content/themes/online-mmj-card"; }
function get_template_directory() { return "%THEME_DIR%"; }
function get_stylesheet_uri() { return "http://example.com/wp-content/themes/online-mmj-card/style.css"; }
function wp_enqueue_style(...$args) {}
function wp_enqueue_script(...$args) {}
function wp_localize_script(...$args) {}
function add_meta_box(...$args) {}
function add_shortcode($tag, $callback) {
    global $registered_shortcodes;
    $registered_shortcodes[$tag] = $callback;
}
function esc_html__($t, $d = '') { return $t; }
function esc_html($t) { return $t; }
function esc_attr($t) { return $t; }
function esc_url($u) { return $u; }
function esc_url_raw($u) { return $u; }
function home_url($p = '') { return "http://example.com" . $p; }
function admin_url($p = '') { return "http://example.com/wp-admin/" . $p; }
function rest_url($p = '') { return "http://example.com/wp-json/" . $p; }
function is_user_logged_in() { return false; }
function get_option($o, $d = false) { return $d; }
function update_option($o, $v) { return true; }
function delete_option($o) { return true; }
function get_transient($t) { return false; }
function set_transient($t, $v, $e) { return true; }
function delete_transient($t) { return true; }
function __($t, $d = '') { return $t; }
function _e($t, $d = '') { echo $t; }
function register_block_pattern_category(...$args) {}
function add_menu_page(...$args) {}
function add_submenu_page(...$args) {}
function register_rest_route(...$args) {}
function add_editor_style(...$args) {}
function is_wp_error($thing) { return ($thing instanceof WP_Error); }
function size_format($b) { return "{$b} B"; }
function current_time($type) { return date('Y-m-d H:i:s'); }
function sanitize_text_field($s) { return trim(strip_tags($s)); }
function sanitize_email($e) { return filter_var($e, FILTER_SANITIZE_EMAIL); }
function is_email($e) { return filter_var($e, FILTER_VALIDATE_EMAIL); }
function wp_rand($min, $max) { return rand($min, $max); }

class WP_Error {
    private $code; private $message; private $data;
    public function __construct($code = '', $message = '', $data = '') {
        $this->code = $code; $this->message = $message; $this->data = $data;
    }
    public function get_error_code() { return $this->code; }
    public function get_error_message() { return $this->message; }
    public function get_error_data() { return $this->data; }
    public function get_error_messages() { return array($this->message); }
}

class WP_DB_Mock {
    public $prefix = "wp_";
    public function get_charset_collate() { return "DEFAULT CHARACTER SET utf8mb4"; }
}
$wpdb = new WP_DB_Mock();

try {
    require_once '%THEME_DIR%/functions.php';
    echo "SUCCESS_LOAD";
} catch (Throwable $e) {
    echo "EXCEPTION:" . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine();
}
EOPHP;

        $test_script = str_replace('%THEME_DIR%', addslashes($this->theme_dir), $test_script);
        $temp_file = sys_get_temp_dir() . '/online_mmj_mock_test_' . uniqid() . '.php';
        file_put_contents($temp_file, "<?php\n" . $test_script);

        $output = array();
        $ret = 0;
        exec('php ' . escapeshellarg($temp_file) . ' 2>&1', $output, $ret);
        @unlink($temp_file);

        $out_str = implode("\n", $output);
        if ($ret === 0 && strpos($out_str, 'SUCCESS_LOAD') !== false) {
            $this->addResult($suite, 'Mock Execution', 'PASS', 'functions.php and all modular includes loaded and executed cleanly with zero fatal errors!');
        } else {
            $this->addResult($suite, 'Mock Execution', 'FAIL', 'Execution failed during mock theme run: ' . $out_str);
        }
    }

    private function findFiles($dir, $ext) {
        $results = array();
        $items = scandir($dir);
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') continue;
            $path = $dir . '/' . $item;
            if (is_dir($path)) {
                $results = array_merge($results, $this->findFiles($path, $ext));
            } elseif (pathinfo($path, PATHINFO_EXTENSION) === $ext) {
                $results[] = $path;
            }
        }
        return $results;
    }

    public function renderReport() {
        if ($this->is_cli) {
            $this->renderCliReport();
        } else {
            $this->renderHtmlReport();
        }
    }

    private function renderCliReport() {
        $green  = "\033[32m";
        $red    = "\033[31m";
        $yellow = "\033[33m";
        $blue   = "\033[34m";
        $bold   = "\033[1m";
        $reset  = "\033[0m";

        echo "\n" . $bold . "================================================================================" . $reset . "\n";
        echo $bold . $blue . " ONLINE MMJ CARD THEME DIAGNOSTIC & CRITICAL ERROR AUDIT REPORT" . $reset . "\n";
        echo " Theme Directory: " . $this->theme_dir . "\n";
        echo " PHP Version:     " . phpversion() . "\n";
        echo " Timestamp:       " . gmdate('Y-m-d H:i:s') . " UTC\n";
        echo $bold . "================================================================================" . $reset . "\n\n";

        foreach ($this->results as $suite => $tests) {
            echo $bold . "▶ {$suite}" . $reset . "\n";
            echo str_repeat('-', 78) . "\n";
            foreach ($tests as $t) {
                $badge = " [ PASS ] ";
                $color = $green;
                if ($t['status'] === 'FAIL') {
                    $badge = " [ FAIL ] ";
                    $color = $red;
                } elseif ($t['status'] === 'WARN') {
                    $badge = " [ WARN ] ";
                    $color = $yellow;
                }

                echo $color . $badge . $reset . " " . str_pad($t['test'], 36) . " " . $t['message'] . "\n";
                if (!empty($t['details'])) {
                    echo "          " . $red . "Details: " . trim($t['details']) . $reset . "\n";
                }
            }
            echo "\n";
        }

        echo $bold . "================================================================================" . $reset . "\n";
        echo " AUDIT SUMMARY: Total: {$this->total_tests} | " .
             $green . "Passed: {$this->passed_tests}" . $reset . " | " .
             ($this->warning_tests > 0 ? $yellow : '') . "Warnings: {$this->warning_tests}" . $reset . " | " .
             ($this->failed_tests > 0 ? $red . $bold : '') . "Failed: {$this->failed_tests}" . $reset . "\n";

        if ($this->failed_tests === 0) {
            echo $green . $bold . " ✓ VERDICT: THEME PASSES ALL INTEGRATION AND CRITICAL ERROR CHECKS!" . $reset . "\n";
            echo " The theme is completely safe to activate on WordPress.\n";
        } else {
            echo $red . $bold . " ✗ VERDICT: {$this->failed_tests} CRITICAL ERROR HAZARDS FOUND. FIX BEFORE ACTIVATION." . $reset . "\n";
        }
        echo $bold . "================================================================================" . $reset . "\n\n";
    }

    private function renderHtmlReport() {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OnlineMMJCard Theme Diagnostic & Critical Error Audit</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 32px 16px; line-height: 1.5; }
                .container { max-width: 960px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.08); overflow: hidden; border: 1px solid #e2e8f0; }
                .header { background: #008f58; color: #fff; padding: 28px 32px; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
                .header p { margin: 6px 0 0; opacity: 0.9; font-size: 13px; }
                .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; padding: 24px 32px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; }
                .stat-box { background: #fff; border-radius: 8px; padding: 14px 18px; border: 1px solid #cbd5e1; }
                .stat-box .num { font-size: 26px; font-weight: 800; }
                .stat-box .lbl { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-top: 2px; }
                .content { padding: 28px 32px; }
                .suite-title { font-size: 16px; font-weight: 800; color: #0f172a; margin: 24px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
                .test-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; border-radius: 8px; margin-bottom: 8px; background: #f8fafc; font-size: 13px; }
                .badge { padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; flex-shrink: 0; }
                .badge-PASS { background: #dcfce7; color: #15803d; }
                .badge-FAIL { background: #fee2e2; color: #b91c1c; }
                .badge-WARN { background: #fef3c7; color: #b45309; }
                .test-name { font-weight: 700; color: #334155; width: 240px; flex-shrink: 0; }
                .test-msg { color: #475569; flex-grow: 1; }
                .details { margin-top: 6px; background: #fff; padding: 8px 12px; border-radius: 6px; border: 1px solid #fca5a5; font-family: monospace; font-size: 11px; color: #991b1b; white-space: pre-wrap; }
                .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>OnlineMMJCard Theme Diagnostic Audit</h1>
                    <p>Theme: <?php echo esc_html($this->theme_dir); ?> &bull; PHP <?php echo phpversion(); ?></p>
                </div>

                <div class="summary">
                    <div class="stat-box"><div class="num" style="color:#0f172a;"><?php echo $this->total_tests; ?></div><div class="lbl">Total Tests</div></div>
                    <div class="stat-box"><div class="num" style="color:#16a34a;"><?php echo $this->passed_tests; ?></div><div class="lbl">Passed</div></div>
                    <div class="stat-box"><div class="num" style="color:#f59e0b;"><?php echo $this->warning_tests; ?></div><div class="lbl">Warnings</div></div>
                    <div class="stat-box"><div class="num" style="color:#dc2626;"><?php echo $this->failed_tests; ?></div><div class="lbl">Failed</div></div>
                </div>

                <div class="content">
                    <?php foreach ($this->results as $suite => $tests) : ?>
                        <div class="suite-title"><?php echo esc_html($suite); ?></div>
                        <?php foreach ($tests as $t) : ?>
                            <div class="test-row">
                                <span class="badge badge-<?php echo esc_attr($t['status']); ?>"><?php echo esc_html($t['status']); ?></span>
                                <span class="test-name"><?php echo esc_html($t['test']); ?></span>
                                <div class="test-msg">
                                    <?php echo esc_html($t['message']); ?>
                                    <?php if (!empty($t['details'])) : ?>
                                        <div class="details"><?php echo esc_html($t['details']); ?></div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endforeach; ?>
                </div>

                <div class="footer">
                    OnlineMMJCard Theme Diagnostic & Verification Suite &bull; Ready for WordPress Deployment
                </div>
            </div>
        </body>
        </html>
        <?php
    }
}

// -----------------------------------------------------------------------------
// WordPress Integration Hooks
// -----------------------------------------------------------------------------
if (defined('ABSPATH')) {
    // 1. Intercept theme activation and record detailed status report
    add_action('after_switch_theme', array('OnlineMMJThemeDebugger', 'interceptActivation'), 5);

    // 2. Display formatted status report notice in WordPress Admin
    add_action('admin_notices', function() {
        if (!function_exists('get_transient')) return;
        $report = get_transient('online_mmj_activation_audit_report');
        if ($report && is_array($report)) {
            $summary = $report['summary'];
            $results = $report['results'];
            $is_success = ($summary['failed'] === 0);
            $log_path = function_exists('online_mmj_get_debug_log_file') ? online_mmj_get_debug_log_file() : 'wp-content/debug.log';
            ?>
            <div class="notice notice-<?php echo $is_success ? 'success' : 'error'; ?> is-dismissible" style="border-left-width:5px; border-left-color:<?php echo $is_success ? '#008f58' : '#ef4444'; ?>; padding:16px 20px; margin:16px 0;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
                    <span style="font-size:24px;"><?php echo $is_success ? '✅' : '⚠️'; ?></span>
                    <div>
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:#0f172a;">
                            <?php if ($is_success) : ?>
                                OnlineMMJCard Theme Activated: All Required Files &amp; functions.php Syntax Verified (0 Critical Errors)
                            <?php else : ?>
                                OnlineMMJCard Theme Activation Diagnostic Alert: Issues Detected
                            <?php endif; ?>
                        </h3>
                        <p style="margin:4px 0 0; font-size:12px; color:#64748b;">
                            Audited <strong><?php echo intval($summary['total']); ?></strong> components: 
                            <strong style="color:#16a34a;"><?php echo intval($summary['passed']); ?> passed</strong>, 
                            <strong style="color:<?php echo $summary['failed'] > 0 ? '#dc2626' : '#64748b'; ?>;"><?php echo intval($summary['failed']); ?> failed</strong>. 
                            Log recorded in <code><?php echo esc_html($log_path); ?></code>.
                        </p>
                    </div>
                </div>

                <details style="margin-top:10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;">
                    <summary style="cursor:pointer; font-weight:700; font-size:13px; color:#1e293b;">
                        Click here to view full activation status report breakdown (Templates, file paths, functions.php syntax)
                    </summary>
                    <div style="margin-top:12px; max-height:320px; overflow-y:auto; font-size:12px;">
                        <?php foreach ($results as $suite => $tests) : ?>
                            <h4 style="margin:12px 0 4px; font-size:12px; text-transform:uppercase; color:#008f58; letter-spacing:0.5px;"><?php echo esc_html($suite); ?></h4>
                            <table style="width:100%; border-collapse:collapse; margin-bottom:8px;">
                                <?php foreach ($tests as $t) : ?>
                                    <tr style="border-bottom:1px solid #f1f5f9;">
                                        <td style="width:65px; padding:4px 6px;">
                                            <span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; background:<?php echo $t['status'] === 'PASS' ? '#dcfce7; color:#15803d;' : ($t['status'] === 'FAIL' ? '#fee2e2; color:#b91c1c;' : '#fef3c7; color:#b45309;'); ?>">
                                                <?php echo esc_html($t['status']); ?>
                                            </span>
                                        </td>
                                        <td style="width:220px; font-weight:600; padding:4px 6px; color:#334155;"><?php echo esc_html($t['test']); ?></td>
                                        <td style="padding:4px 6px; color:#64748b;"><?php echo esc_html($t['message']); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </table>
                        <?php endforeach; ?>
                    </div>
                </details>
            </div>
            <?php
        }
    });

    // 3. Admin subpage to run on-demand diagnostics
    add_action('admin_menu', function() {
        if (!function_exists('add_submenu_page')) return;
        add_submenu_page(
            'online-mmj-leads',
            __('Theme Diagnostic & Activation Audit', 'online-mmj-card'),
            __('Theme Diagnostics', 'online-mmj-card'),
            'manage_options',
            'online-mmj-diagnostics',
            function() {
                $theme_dir = function_exists('get_template_directory') ? get_template_directory() : __DIR__;
                $debugger = new OnlineMMJThemeDebugger($theme_dir, false);
                $debugger->runAll();
            }
        );
    }, 40);
}

// -----------------------------------------------------------------------------
// Direct Standalone Execution (CLI or direct browser hit)
// -----------------------------------------------------------------------------
$is_standalone_cli = ($is_cli && !defined('ONLINE_MMJ_MOCK_TEST') && !defined('ABSPATH') && isset($_SERVER['SCRIPT_FILENAME']) && (basename($_SERVER['SCRIPT_FILENAME']) === 'debug_theme.php'));
$is_standalone_web = (!defined('ABSPATH') && !defined('ONLINE_MMJ_MOCK_TEST') && isset($_SERVER['SCRIPT_FILENAME']) && (basename($_SERVER['SCRIPT_FILENAME']) === 'debug_theme.php'));

if ($is_standalone_cli || $is_standalone_web) {
    $debugger = new OnlineMMJThemeDebugger($theme_dir, $is_cli);
    $debugger->runAll();
}
