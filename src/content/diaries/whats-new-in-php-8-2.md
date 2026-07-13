---
title: "[Bangla] What's New In PHP 8.2"
description: "পিএইচপি ৮.২-এ নতুন কী কী এসেছে — readonly ক্লাস, নতুন টাইপসহ গুরুত্বপূর্ণ পরিবর্তন ও ফিচারগুলোর সংক্ষিপ্ত পর্যালোচনা।"
pubDate: 2022-12-19
category: whats-new-in-php
tags:
  - php
  - released
heroImage: "/images/Whats-New-In-PHP-8.2-Banner.png"
heroImageAlt: "What's New in PHP 8.2 নিয়ে ব্যানার চিত্র"
lang: bn
---

আসসালামুআলাইকুম, আশাকরি সবাই ভালো আছেন। PHP 8.2 রিলিজ হতে আর মাত্র কয়েকটি দিন বাকি, অর্থাৎ ডিসেম্বরের ৮ তারিখে রিলিজ হতে যাচ্ছে PHP 8.2. প্রতিবারের মতোই এই ভার্সনে নতুন কিছু ফিচার যুক্ত হয়েছে, কিছু আগের ফিচারকে ডিপ্রিকেট করা হয়েছে, আগের কিছু ফিচারের পরিবর্তন আনা হয়েছে এবং কিছু ডিপ্রিকেটেড ফিচার এই ভার্সনে রিমুভ করে দেয়া হয়েছে। আজকের এই লেখায়া আমরা মূলত এই পরিবর্তনগুলোর গুরুত্বপূর্ন কিছু বিষয় নিয়েই আলোচনা করবো ইনশা'আল্লাহ।

## Changes

- ➕ [readonly Classes](#readonly-classes)

- ➕ [Added three new types](#new-type)

- ➕ [MySQLi: New mysqli\_execute\_query function and mysqli::execute\_query method](#new-mysqli-method)

- ➕ [New Random Extension](#new-randomizer)

- ➕ [Disjunctive Normal Form (DNF) Types](#dnf)

- ➕ [Redact parameters in backtraces](#redact-params-backtrace)

- ➕ [Allow Constants in Traits](#trait-constant)

- ⚠️ [Deprecate dynamic properties](#dynamic-props-deprecated)

- ⚠️ [Deprecate Partially Supported Callables](#deprecate-callable)

- ⚠️ [Deprecate ${} String Interpolation](#deprecate-string-interpolation)

- ⓧ [Remove Support for libmysql from mysqli](#remove-libmysql-mysqli)

## readonly Classes

PHP 8.1 ইতিমধ্যেই `readonly` প্রোপার্টির সাপোর্ট দিয়েছে। `readonly` প্রোপার্টির বৈশিষ্ট্য হচ্ছে এটিতে কেবলমাত্র একবারই ভ্যালু এসাইন করা যাবে এবং পরবর্তীতে এটি আর মডিফাই করা যাবে না, এমনকি ক্লাস স্কোপের ভিতর থেকেও না। PHP 8.2'তে এই ফিচারটিকেই আরও এনরিচ করা হয়েছে, অর্থাৎ এখানে `readonly` প্রোপার্টির সাথে `readonly` class'ও ডিকলেয়ার করা যাবে। যদি কোনো ক্লাসকে `readonly` হিসেবে ডিকলেয়ার করা হয় তবে সেই ক্লাসের সকল প্রোপার্টিই রিড অনলি হিসেবে বিহেব করবে।

#### PHP 8.1: readonly property

```php
class UserResponse
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $website,
        public readonly string $phone,
    ) {}
}
```

উপরের এই একই কাজটি PHP 8.2 তে আরও সহজ করে দিয়েছে, আমরা নিচের উদাহরনটি দেখি

```php
readonly class UserResponse
{
    public function __construct(
        public string $name,
        public string $email,
        public string $website,
        public string $phone,
    ) {}
}
```

`readonly` ক্লাস ব্যবহার করলে এই ক্লাসের ইন্সট্যান্সে কোনো ডায়নামিক প্রোপারটি কল করা যাবে না।

```php
$user = new UserResponse();
$user->undefined = 'unknown';

//Uncaught Error: Cannot create dynamic property UserResponse::$undefined
```

একটি বিষয় অবশ্যই মনে রাখতে হবে `readonly` ক্লাসের সকল প্রোপার্টি Typed প্রোপার্টি হতে হবে, এই একই বিষয়টা `readonly` প্রোপার্টির ক্ষেত্রেও প্রযোজ্য।

> আপনি `readonly` ক্লাসকে extend করতে পারবেন যদি আপনার চাইল্ড ক্লাসও `readonly` হয়।

এই ফিচারটি মূলত DTO, Data Model ইত্যাদি ডিজাইনের জন্য বেস্ট সলুশন হবে।

## Added three new types

PHP 8.2'তে তিনটি নতুন টাইপ যুক্ত হয়েছে `null`, `false` এবং `true`. অর্থাৎ আপনি `boolean` ছাড়াও `true` এবং. `false`'কে ইন্ডিভিজুয়াল টাইপ হিসেবে ডিকলেয়ার করতে পারবেন। PHP'র কিছু বিল্টইন ফাংশান আছে যারা শুধু `true` কিংবা `false` রিটার্ন করে অন্য কোনো টাইপের সাথে। যেমন `file_get_contents(string $string): string|false`. এই ফাংশানটি `string` রিটার্ন করে যদি সাকসেস হয়, অন্যথায় `false` রিটার্ন করে।

```php
function count_collection(array $collection): int|false
{
    if (!is_array($collection)) {
        return false;
    }

    return count($collection);
}
```

## MySQLi: New mysqli\_execute\_query function and mysqli::execute\_query method

PHP 8.2'তে `mysqli_execute_query` ফাংশান ও `mysqli::execute_query` মেথড নতুনকরে যুক্ত হয়েছে। যদিও দুটোই একই কাজ করে শুধু একটি হচ্ছে প্রোসিডিউরাল ওয়েতে এবং অন্যটি হচ্ছে অবজেক্ট অরিয়েন্টেড ওয়েতে। এই মেথড বা ফাংশানের মাধ্যমে আপনি একই সাথে পূর্বের `prepare`, `bind`, `execute` ও `get_result` এর কাজ করতে পারবেন। মেথডটি কাজকে খুবই সহজ করে দিয়েছে কিন্তু এটি খুবই পাওয়ারফুল।

```php
$query = 'SELECT id, username, name FROM users WHERE id = ? AND status = ?';
$statement = $connection->prepare($query);
$statement->bind_param('si', $id, $status);
$statement->execute();
$user = $statement->get_result();
```

উপরের কোডটি PHP 8.2 এর পূর্বের ভার্সনের, এবার আমরা নতুন ফাংশানটি ব্যবহার করে একই কাজটি করে দেখি

```php
$query = 'SELECT id, username, name FROM users WHERE id = ? AND status = ?';
$user = $mysql->execute_query($query, [$id, $status]);
```

## New Random Extension

এই ভার্সনে নতুন অবজেক্ট অরিয়েন্টেড [random number generation extension](https://www.php.net/manual/en/book.random.php) যুক্ত হয়েছে, যেখানে পূর্বের অনেকগুলো random number এর সমস্যার সমাধান করা হয়েছে। নতুন এই ফিচারের পারফরম্যান্স খুবই ভালো, সিকিউর, সহজে মেইনটেইন যোগ্য এবং এটি আগের মতো Global State এর উপরে নির্ভরশীল না, ফলে এর ইন্টার্নাল কমপ্লেক্সিটি অনেকখানি কমে গিয়েছে। নতুন এই এক্সটেনশন random number জেনারেশনের জন্য একাধিক মডার্ন Randomizer Engine সাপোর্ট করে।

```php
$engine = new Random\Engine\Secure();

$randomizer = new Random\Randomizer($engine);
$randomizer->getInt(1, 100);
```

উপরের উদাহরনে `Secure()` Randomizer Engine ব্যবহার করা হয়েছে। আপনি চাইলে সাপোর্টেড যেকোনো ইঞ্জিন ব্যবহার করতে পারবেন। সেক্ষেত্রে আপনাকে `Randomizer()` এর প্যারামিটারে ইঞ্জিন পরিবর্তন করে দিলেই হবে, যেমন:

```php
$engine = new Random\Engine\Mt19937(1234);

$randomizer = new Random\Randomizer($engine);
$randomizer->getInt(1, 100);
```

## Disjunctive Normal Form (DNF) Types

এটি চমৎকার একটি সংযোজন PHP 8.2 ভার্সনের। এটি PHP 8.0 এর Union Types এবং PHP 8.1 এর Intersection Types এর একটি কমবাইন্ড রুপ। এর পূর্বে এর দুটোকে একত্রে ব্যবহার করা যেতনা।

```php
class JsonData
{
    public function keys((Countable&iterable)|null $data)
    {
        // do something
    }
}
```

> এখানে খেয়াল রাখার বিষয় হচ্ছে Intersection Types'কে ব্রাকেট দিয়ে গ্রুপ করে নিতে হবে যদি Union Types এর সাথে ব্যবহার করতে চাই।

## Redact parameters in backtraces

এটি আরেকটি অনন্য সংযোজন PHP 8.2 ভার্সনের। Backtrace হচ্ছে এমন একটি প্রক্রিয়া যেটি প্রোগ্রামকে Debug করতে সাহায্য করে। এটি মূলত প্রোগ্রামে কখন কোন অংশে কি করতে গিয়ে প্রোগ্রামটি ব্রেক করেছে সেটি লগ করে, ফলে অনেক সময়ই Sensetive ডাটা সেখানে চলে আসে যেটি এক্সপোজ হওয়া উচিৎ নয়।

```php
function db_connect(string $database, string $user, string $password, string $host = 'localhost')
{
    $dsn = "mysql:dbname=$database;host=$host";
    $db = new PDO($dsn, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}

$db = db_connect('mydb', 'root', 'password');
```

উপরের কোডে যদি কোনো exception হয় তবে নিচের মতো করে একটি ইরর দেখাবে

```log
PDOException: SQLSTATE[HY000] [2002] No such file or directory in /var/www/html/test.php:3
Stack trace: #0 /var/www/html/test.php(3): PDO->__construct('mysql:host=loca...', 'root', 'password')
#1 {main}
```

এখানে দেখা যাচ্ছে database password আমাদের একটি সেনসেটিভ ডাটা যেটি এক্সপোজ হয়ে গেছে। অথচ এটি প্রকাশ পাওয়াটি নিরাপদ নয়। এই ফিচারটি আপনাকে backtrace থেকে সেনসেটিভ ডাটা hide করার সুযোগ দিয়ে কোনো এক্সটার্নাল টুল ব্যবহার ছাড়াই।

```php
function db_connect(string $database, string $user, #[\SensitiveParameter] string $password, string $host = 'localhost')
{
    $dsn = "mysql:dbname=$database;host=$host";
    $db = new PDO($dsn, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}

$db = db_connect('mydb', 'root', 'password');
```

```log
PDOException: SQLSTATE[HY000] [2002] No such file or directory in /var/www/html/test.php:3
Stack trace: #0 /var/www/html/test.php(3): PDO->__construct('mysql:host=loca...', 'root', Object(SensitiveParameterValue))
#1 {main}
```

উপরের উদাহরনটি খেয়াল করলে দেখবেন এখানে আমারা ফাংশানের প্যারামিটারের শুরুতে `#[\SensitiveParameter]` অ্যাট্রিবিউট দিয়ে বলে দিয়েছি যে উক্ত প্যারামিটারটি সেনসেটিভ, ফলে যখন stack trace'য়ে এই ভ্যালুটির পরিবর্তে `Object(SensitiveParameterValue)` দিয়ে রিপ্লেস/মাস্কিং হয়েছে।

## Allow Constants in Traits

PHP'র এই ভার্সনের পূর্বে `traits`'য়ে constant যুক্ত করা যেতো না, এখন PHP 8.2 থেকে আপনি traits'য়ে constant যুক্ত করতে পারবেন।

```php
trait SlugableTitle
{
    const SLUGABLE_TITLE = 'title';

    public function getSlugableTitle(): string
    {
        return self::SLUGABLE_TITLE;
    }
}
```

আপনি traits constant'কে কখনও এর নাম ধরে কল করতে পারবেন না।

```php
echo SlugableTitle::SLUGABLE_TITLE;
```

উপরের কোডটিতে ইরর হবে, কিন্তু যে class trait ব্যবহার করবে আপনি চাইলে সেই ক্লাসের নাম ধরে এর constant'কে কল করতে পারবেন।

```php
class Post
{
    use SlugableTitle;
}

// ...

echo Post::SLUGABLE_TITLE;
```

## Deprecate dynamic properties

যারা এতোদিন PHP'র ডায়নামিক প্রোপার্টি নিয়ে নানান সমালোচনা করতেন তাদের জন্য সুখবর, PHP 8.2 থেকে Dynamic Property ফিচারটি **deprecated** করে দেয়া হয়েছে এবং PHP 9.0 থেকে এটি Error জেনারেট করবে। PHP কমুনিটির এটি দারুন একটি ইনিশিয়েটিভ, এটি PHP'কে এর ডাইনামিক বিহেবিয়ার থেকে অনেকটা বের করে নিয়ে আসবে। এর কিছু অসুবিধা রয়েছে, যেমন: ডেভলপার এক্সপেরিয়েন্স কমাবে।

```php
class User{
    public string $name;
}

// ...

$user = new User();
$user->email = 'my@email.com';
```

উপরে আমরা যে `$user->email` কল করেছি এটি এখন থেকে ডেপ্রিকেটেড এবং এটিতে deprecation এর নোটিস দেখাবে, কারন উক্ত প্রোপার্টির অস্তিত্ব এই ক্লাসে নেই।

তবে আপনি যদি `__get` এবং `__set` ইমপ্লিমেন্ট করে তবে ডাইনামিক প্রোপার্টি ব্যবহার করতে পারবেন।

```php
class User{
    protected array $props = [];

    public function __set($name, $value)
    {
        $this->props[$name] = $value;
    }
}

$user = new User();
$user->email = 'my@email.com';
```

উপরের কোডটি এক্ষেত্রে ভ্যালিড হবে।

এরপরেও যদি এমন হয় যে আপনার প্রোজেক্টে ডাইনামিক প্রোপার্টিতে ভরপুর এবং আপনি চাচ্ছেন না আপনার প্রোজেক্টে এই ধরনে নোটিস প্রদর্শন করুন তাহলে এর চমৎকার একটি সমাধান রয়েছে। আপনি `[AllowDynamicProperties]` এট্রিবিউটকে ঐ ক্লাসে বলে দিতে পারবেন, এতে করে PHP ঐ ক্লাসের জন্য Dynamic Property'র decprication নোটিস দেখানো বন্ধ করবে।

```php
#[AllowDynamicProperties]
class User
{
    public string $name;
}

// ...

$user = new User();
$user->email = 'my@email.com';
```

উপরের উল্লেখিত কোডটি ভ্যালিড এবং এতে কোনো ডেপ্রিকেটেড নোটিশ দেখাবে না।

## Deprecate Partially Supported Callables

এই ভার্সনের আরেকটি পরিবর্তন হচ্ছে Partially Supported Callable'কে ডেপ্রিকেট করা। অর্থাৎ যেসকল `callable`'কে `call_user_func($callable)` দ্বারা কল করা হয় সেগুলোই হচ্ছে Partially Supported Callables, এদেরকে ডিরেক্ট `$callable()` হিসেবে কল করা যায় না। যেসকল Callables'কে ডেপ্রিকেট করা হয়েছে সেগুলো হচ্ছে:

```php
"self::method"
"parent::method"
"static::method"
["self", "method"]
["parent", "method"]
["static", "method"]
["Foo", "Bar::method"]
[new Foo, "Bar::method"]
```

[Nikita Popov](https://twitter.com/nikita_ppv) তার [PR](https://wiki.php.net/rfc/deprecate_partially_supported_callables)'য়ে এবিষয়ে বিস্তারিত বলেছেন

> Apart from the last two cases, all of these callables are context-dependent. The method that `self::method` refers to depends on which class the call or callability check is performed from. In practice, this usually also holds for the last two cases, when used in the form of `[new Foo, "parent::method"]`.
> 
> Reducing the context-dependence of callables is the secondary goal of this RFC. After this RFC, the only scope-dependence still left is method visibility: `Foo::bar` may be visible in one scope, but not another. If callables were to be limited to public methods in the future (while private methods would have to use first-class callables or `Closure::fromCallable()` to be made scope-independent), then the callable type would become well-defined and could be used as a property type. However, changes to visibility handling are not proposed as part of this RFC.

## Deprecate ${} String Interpolation

PHP সবসময়েই নানান ভাবে String'য়ে Variable embed করার সুযোগ দিয়ে এসেছে। এর পূর্বে PHP'তে নিম্ন উপায়ে স্ট্রিং'য়ে ভেরিয়েবল এমবেড করা যেত:

```php
echo "Hello $name";
echo "Hello {$name}";
echo "Hello ${name}";
```

PHP 8.2 থেকে `"Hello ${name}"` এই পদ্ধতিতে স্ট্রিং'য়ে ভেরিয়েবল এমবেড করা ডেপ্রিকেট করে দিচ্ছে এবং PHP 9.0 থেকে এটি Exception Throw করবে। কিন্তু নিচের দেয়া জনপ্রিয় দুটি পদ্ধতিতে এখনও স্ট্রিং এমবেড করা যাবে।

```php
echo "Hello $name";
echo "Hello {$name}";
```

## Remove Support for libmysql from mysqli

PHP'তে MySQL এর সাথে কাজ করার জন্য দুটো extension রয়েছে, `pdo_mysql` এবং `mysqli`. `mysqli` এক্সটেনশনকে দুটি লাইব্রেরি দিয়ে কম্পাইল করা যায়, `libmysql` এবং `mysqlnd`. PHP 5.4 থেকে `mysqlnd`'কে ডিফল্ট লাইব্রেরী হিসেবে রিলিজ করা শুরু করেছে। কিন্তু PHP 8.2 থেকে `libmysql` কে রিমুভ করে দেয়া হচ্ছে, অর্থাৎ এখন থেকে আপনি আর `libmysql` লাইব্রেরী দিয়ে এটিকে আর কম্পাইল করতে পারবেন না।

এই ছিলো PHP 8.2 এর নতুন আপডেট সমূহ নিয়ে ছোট্ট আলোচনা, আশাকরি লেখাটি আপনাদের উপকারে আসবে ইনশা'আল্লাহ। লেখায় কোনো প্রকার ভুল-ত্রুটি থাকলে কিংবা আপনার কোনো পরামর্শ থাকলে কমেন্টে জানাতে পারেন। ধন্যবাদ :)

* * *

[https://wiki.php.net/rfc#php\_82](https://wiki.php.net/rfc#php_82)  
[https://kinsta.com/blog/php-8-2/](https://kinsta.com/blog/php-8-2/)  
[https://stitcher.io/blog/new-in-php-82](https://stitcher.io/blog/new-in-php-82)  
[https://php.watch/versions/8.2](https://php.watch/versions/8.2)
