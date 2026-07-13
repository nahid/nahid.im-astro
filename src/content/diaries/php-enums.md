---
title: "[Bangla] How to Use Enums in PHP"
description: "Enum কী এবং পিএইচপি ৮.১-এ যুক্ত হওয়া ম্যাচিউর Enum ফিচার কীভাবে ব্যবহার করবেন — বাস্তব উদাহরণসহ পরিচিতি।"
pubDate: 2022-11-27
category: php
tags:
  - enum
  - oop
  - php
heroImage: "/images/Introducewith-PHP-enum.png"
heroImageAlt: "PHP Enum নিয়ে ব্যানার চিত্র"
lang: bn
---

Enum হচ্ছে একটি স্পেশাল টাইপ ডাটা যেখানে কিছু ডাটাসেটকে পূর্বে থেকেই কন্সট্যান্ট হিসেবে সেট করা থাকে। Enum এর ফুল ফর্ম হচ্ছে enumeration এবং এটি হচ্ছে একধরনের Data Type, অর্থাৎ প্রকৃত enum'কে আপনি ভেরিয়েবল টাইপ কিংবা ফাংশান বা মেথডের টাইপ হিন্ট হিসেবে দিতে পারবেন। কিন্তু Enum এর অভ্যন্তরীন ডাটাসেট আবার ভিন্ন ধরনের ডাটাটাইপ হতে পারে। যেমন, কোনো enum যদি define করা থাকে `integer` হিসেবে, তার মানে হচ্ছে এর অভ্যন্তরীন ডাটাসেট এর ভ্যালু হবে `integer`। মজার ব্যবহার হলো Enum এর ডাটাসেটের প্রতেকটি এলিমেন্ট রিটার্ন করে ঐ Enum এর টাইপ।

> তবে যদি কোনো ল্যাংগুয়েজে Enum সাপোর্ট না থাকে তবে সেখানে Constant কিংবা Class Constant ব্যবহার করা যেতে পারে। সেক্ষেত্রে অবশ্য আপনি Enum এর পুরো সুবিধা সেখান থেকে পাবেন না।

## PHP'তে Enum

PHP'তে Enum এসেছে মাত্র কিছুদিন হলো। তবে PHP'এর Enum অনেক ম্যাচিউর ও এডভান্স। এটি PHP'তে যুক্ত হয় ভার্সন `8.1` থেকে। ইতিমধ্যে PHP'তে Enum এর জনপ্রিয়তা বৃদ্ধি পাচ্ছে।

```php
enum Status: int 
{
  case PENDING = 0;
  case APPROVED = 1;
  case BLOCKED = 2;
}
```

উপরের এক্সামপলে একটি PHP enum এর চিত্র তুলে ধরা হলো যেটি `integer` টাইপ ডাটাসেট ধারন করে।

## Enum এর গুরুত্ব ও প্রয়োজনীয়তা

আমরা এতোক্ষন আলোচনা করেছি Enum কি সেটি নিয়ে। কিন্তু আমি যদি না জানি এটি কি কাজে লাগে তবে এর ব্যবহার সবসময়েই আমার কাছে অস্পস্ট থেকে যাবে। তবে Enum এর গুরুত্ব বোঝার জন্য আমাকে আগে Enum না থাকার সমস্যা সম্পর্কে জানতে হবে।

আমি যদি একেবারে বেসিক ধারনার কথা বলি সেটা হচ্ছে Enum হচ্ছে একটি Key Value পেয়ার। এখন আমাদের সফটওয়্যার ডেভলপমেন্টের সময় এমন অনেকগুলো সিনারিও আসে যেখানে আপনাকে কিছু প্রিডিভাইন্ড ভ্যালু নিয়ে কাজ করতে হয়, যে ভ্যালুগুলো একটি নির্দিষ্ট অর্থবহন করে। যেমন: উপরের উদাহরনে দেখা যাচ্ছে `Approved` এর ভ্যালু হচ্ছে 1. এখন আমরা যদি এটিকে হার্ডকোড হিসেবে প্রোগ্রামে লিখি সেখানে কিছু সমস্যা রয়েছে। নিচের উদাহরন দেখলে বোঝা যাবে।

```
if ($comment->status === 1) {
    // do something
}
```

এখানে আমরা হার্ডকোড ভ্যালু ব্যবহার করেছি, এবং এভাবে যদি আমরা আমাদের এপ্লিকেশনের বহু জায়গায় কোড লিখি সেটাকে পরবর্তিতে রিফ্যাক্টর করা দুরুহ হয়ে পরবে। অর্থাৎ প্রোগ্রামে কোনো কারনে যদি আমাদের Approved এর ভ্যালু 1 এর পরিবর্তে 3 করার প্রয়োজন হয় তবে আমাদের সকল জায়গায় মেনুয়ালি গিয়ে সেটাকে পরিবর্তন করতে হবে, কিন্তু আমরা যদি নিচের মতো করে কোড লিখতাম তাহলে আমরা শুধু Enum ফাইলে `Approved` এর ভ্যালু পরিবর্তন করে দিলেই চলতো।

```
if ($comment->status === Status::APPROVED) {
    // do something
}
```

উপরের উদাহরনটি হচ্ছে একটি বেসিক ধারনা, এই কাজটি করার জন্য আপনাকে Enum ব্যবহারের প্রয়োজন পরবে না বরং আপনি সাধারন Class Constant দিয়েই এই সমস্যার সমধান করত পারবেন। অর্থাৎ আমরা `Status` কে Enum হিসেবে ব্যবহার না করে একটি ক্লাস কিংবা ইন্টারফেস বানিয়ে কাজটি করে ফেলতে পারতাম নিচের মতো।

```
interface Status
{
    const PENDING = 0;
    const APPROVED = 1;
    const BLOCKED = 2; 
}
```

এবার প্রশ্ন আসতে পারে **তাহলে Enum কেন দরকার?** এটি খুবই গুরুত্বপূর্ন একটি বিষয়। এটি বোঝার জন্য আপনার [Strict Type](https://www.geeksforgeeks.org/strict-type-checking-in-cpp/) সম্পর্কে ধারনা থাকতে হবে। আমি ধরে নিচ্ছি আপনি Strictly Typed ও Loosly Typed ল্যাংগুয়েজের পার্থক্য বুঝেন।

### Enum এর Data Type হিসেবে গুরুত্ব

ধরুন আপনি DateTime নিয়ে কাজ করছেন। সেখানে আপনি সপ্তাহের দিনগুলোকে Saturday থেকে Friday পর্যন্ত 1 থেকে 7 ভ্যালু দিয়ে ডিফাইন করলেন। এবার একটি মেথড তৈরী করলেন যার নাম হলো `checkWeekend(int $day)`.

```
public function checkWeekend(int $day): bool
{
    if ($day === 1 || $day === 7) {
        return true;
    }

    return false;
}
```

অথবা আমরা এটিকে Class Constant দিয়েও চেক করতে পারতাম নিচের মতো

```
public function checkWeekend(int $day): bool
{
    if ($day === WeekDay::SATURDAY || $day === WeekDay::FRIDAY) {
        return true;
    }

    return false;
}
```

উপরের দুটো উদাহরনই সুন্দরভাবে কাজ করবে কিন্তু সমস্যা অন্য জায়গায়। দেখুন আমাদের মেথডের প্যারামিটার `integer` ভ্যালু এক্সেপ্ট করে। অর্থাৎ আমি যদি এর প্যারামিটার হিসেবে 100 কিংবা 2590 যাই দেই না কেন সে এটাকে গ্রহন করবে একটি ভ্যালিড প্যারামিটার ভ্যালু হিসেবে। কারন এসকল ভ্যালুই `integer`. কিন্তু আমরা চাই আমাদের মেথড প্যারামিটারে শুধু Week Day গুলোই সাপোর্ট করবে অর্থাৎ 1 থেকে 7 এর মধ্যকার ভ্যালু। এর বাহিরে আমরা যদি কিছু দেই তাহলে সেটা গ্রহন করবে না, এক্সেপশন দিবে। এই কাজটি আমরা সাধারনভাবে করতে পারি না (সাধারন টাইপ, Constant কিংবা Class Constant দিয়ে)। তাহলে উপায়? হ্যা এই সমস্যাটিরই মূলত Enum সমাধান দিয়েছে। আমরা যদি `WeekDay` নামে একটি Enum তৈরী করি এবং আমাদের মেথডের প্যারামিটার টাইপ হিসেবে `WeekDay` বলে দেই তাহলেই সমস্যার সমাধান। চলুন দেখি:

```
// Declare enum
enum WeekDay: int 
{
    case SATURDAY   = 1;
    case SUNDAY     = 2;
    case MONDAY     = 3;
    case TUESDAY    = 4;
    case WEDNESDAY  = 5;
    case THURSDAY   = 6;
    case FRIDAY     = 7;
}
```

```
// Declare a method with parameter $day
public function checkWeekend(WeekDay $day): bool
{
    if ($day === WeekDay::SATURDAY || $day === WeekDay::FRIDAY) {
        return true;
    }

    return false;
}
```

আমরা যদি উপরের উদাহরন দুটি খেয়াল করি তাহলে দেখবো এখানে Week day এর জন্য একটি Enum ডিকলেয়ার করা হয়েছে যেখানে 1-7 পর্যন্ত একটি ডাটাসেট রয়েছে এবং একটি মেথড রয়েছে যার একটি প্যারামিটার `$day` এবং তার টাইপ হচ্ছে `WeekDay`. এখানে লক্ষনীয় বিষয় হচ্ছে আমরা যেহেতু প্যারামিটার টাইপ উল্লেখ করে দিয়েছি তাই এটিকে আমরা এই টাইপের বাহিরে আর ভ্যালু পাস করতে পারবো না। আর এই `WeekDay` টাইপের ডাটাসেট হচ্ছে 1 থেকে 7 ফলে এর বাহিলে এই Enum আর অন্যকোনো ভ্যালু সাপোর্ট করবে। এবার যদি আমরা সেই আগে সম্যায় আসি যে "যদি কেউ এই মেথডে অন্য কোনো ভ্যালু পাস করে তবে কি হবে?" । এর উত্তর হচ্ছে এখন আর এখানে `WeekDay` টাইপ ব্যতিত অন্যকোনো ডাটা টাইপ পাস করার সুযোগ নেই। ফলে আমাদের সেই Loosly Type প্রোগ্রামটি এখন পুরোপুরি Strict Type প্রোগ্রাম হয়ে গেছে। দারুন না বিষয়টা?

## Enum ব্যবহারের সুবিধাসমূহ

- কোড রিডাবেলিটি বৃদ্ধি পায়।

- কোডগুলো অর্গানাইজড হয়।

- সহজেই রিফ্যাক্টর করা যায়।

- ডাটা টাইপকে পুরোপুরি স্ট্রিক্টলি হ্যান্ডল করা যায় ফলে রানটাইমে ইরর হবার সম্ভাবনা হ্রাস পায়।

- IDE'তে ভালো সাপোর্ট পাওয়া যায় ফলে ডেভলপমেন্ট ফাস্টার হয়।

## Enum Methods

মডার্ন অনেকগুলো ল্যাংগুয়েজই Enum Method সাপোর্ট করে, তারই ধারাবাহিকতা যেহেতু PHP'র Enum নতুন একটি ফিচার তাই PHP'তেও এই দারুন ফিচারটি যুক্ত হয়েছে। Enum Method মূলত Enum এর ডিফল্ট বিহেবিয়ারকে আরও এক্সটেন্ড করার সুযোগ দেয়। ধরুন আমাদের উপরের যে Enum'টি আছে সেখানে আমরা Week Day কে ম্যাপ করেছি। এখন যদি আমরা এরকম কিছু চাই যে `WeekDay` Enum এর কারেন্ট যে ইন্সট্যান্স রয়েছে সেটির সাপেক্ষে আমাদের উইক ডে'র শর্ট নাম রিটার করবে। চলুন নিচের প্রোগ্রামটি দেখে বিষয়টি ক্লিয়ার হই।

```
enum WeekDay: int 
{
    case SATURDAY   = 1;
    case SUNDAY     = 2;
    case MONDAY     = 3;
    case TUESDAY    = 4;
    case WEDNESDAY  = 5;
    case THURSDAY   = 6;
    case FRIDAY     = 7;

    public function shortDay(): string
  {
      return match($this) 
      {
          WeekDay::SATURDAY => 'SAT', 
          WeekDay::SATURDAY => 'SUN', 
          WeekDay::MONDAY => 'MON', 
          WeekDay::TUESDAY => 'TUE', 
          WeekDay::WEDNESDAY => 'WED', 
          WeekDay::THURSDAY => 'THU', 
          WeekDay::FRIDAY => 'FRI', 
      };
  }
}
```

খেয়াল করে দেখুন উপরের উদাহরনে আমরা `shortDay()` নামে একটি মেথড ডিকলেয়ার করেছি `WeekDay` Enum'য়ে। এখানে কারেন্ট ইনস্ট্যান্সের উপর ভিত্তি করে সে আমাদের উইকডে'র সংক্ষিপ্ত নাম রিটার্ন করছে।

```
function getWeekDayShortName(WeekDay $day): string
{
    return $day->shortDay();
}

$day = WeekDay::tryFrom(7);
echo getWeekDayShortName($day);
// FRI
```

যেহেতু `$day` হচ্ছে `WeekDay` Enum এর ইন্সট্যান্স এবং আমরা এখানে 7 পাস করেছি তাই এর আউটপুট হচ্ছে `FRI`.

এছাড়াও PHP Enum `interface`'কে implement সাপোর্ট করে এবং `trait` ব্যবহার করা যায়। আমরা নিচের উদাহরন থেকে দুটো ধারনা পরিষ্কার করবো।

```
interface HasCollection
{
    public function names(): array;
    public function values(): array;
}

trait Collectionable
{
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

enum Status: int implements HasCollection
{
    use Collectionable;
    
    case PENDING = 0;
    case APPROVED = 1;
    case BLOCKED = 2;
}
```

## Enum এর Key ও Value নিয়ে কাজ

অনেক সময়েই আমাদের প্রয়োজন পরে Enum এর Key ও Value নিয়ে কাজ করার। সেক্ষেত্রে Enum এর অবজেক্ট থেকে আপনি বর্তমান Instance'য়ের key value নিচের মতো করে ব্যবহার করতে পারেন।

```
$day = WeekDay::tryFrom(7);
echo $day->value; // return 7
echo $day->name; // return FRIDAY
```

আপনি চাইলে Enum এর `case` গুলোও ব্যবহার করতে পারেন

```
Status::cases();

// List of cases
/*
[
	Status::PENDING,
	Status::APPROVED,
	Status::BLOCKED
]
*/
```

## Enum যেহেতু Object

তাই Enum এর প্রত্যেকটি case মূলত Enum এর ইন্সট্যান্স রিটার্ন করে কিন্তু এর Key ভ্যালু হিসেবে কারেন্ট `case` এর Key Value থাকে। এজন্য এর প্রত্যেকটি কেস এর জন্য অবজেক্ট হচ্ছে একই Enum এর কিন্ত এর কেস ভিন্ন। তাই দুটো আলাদা আলাদা case এর জন্য এর অবজেক্ট রিসোর্স ভিন্ন হবে। নিচের উদাহরন দেখলে আশাকরি বিষয়টা পরিষ্কার হবে।

```
$friday = WeekDay::FRIDAY;
$monday = WeekDay::MONDAY;
$anotherFriday = WeekDay::FRIDAY;

$friday === $anotherFriday; // true
$monday === $friday; // false

$friday instanceof WeekDay // true
```

> যেহতু PHP 8.1 এর পূর্বে Enum ছিলো না তাই আপনি সরাসরি আগের ভার্সনে এই ফিচারটি ব্যবহার করতে পারবেন না, তবে PHP আগের ভার্সনে যদি আপনি Enum ব্যবহার করতে চান তবে [spatie/enum](https://github.com/spatie/enum) কিংবা [myclabs/php-enum](https://github.com/myclabs/php-enum) এই চমৎকার প্যাকেজ দুটো ব্যবহার করতে পারেন।

আশাকরি Enum নিয়ে এই লেখাটি আপনাদের উপকারে আসবে, আল্লাহ সবাইকে ভালো রাখুন :)

[https://stitcher.io/blog/php-enums](https://stitcher.io/blog/php-enums)  
[https://www.php.net/manual/en/language.types.enumerations.php](https://www.php.net/manual/en/language.types.enumerations.php)
