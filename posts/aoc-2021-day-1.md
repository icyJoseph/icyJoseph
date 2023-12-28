---
title: AoC 2021 - Day 1
slug: aoc-2021-day-1
summary: A problem that one could probably solve with a spreadsheet, however, there is still a few things we can learn from it.
tags:
  - rust
  - advent of code
  - coding-challenges
authors:
  - Joseph Chamochumbi
publish_date: 1646161439
---

# Day 1: Sonar Sweep

Advent of Code (AoC) 2021, starts with the Sonar Sweep. You can read the problem statement [on their website](https://adventofcode.com/2021/day/1).

Day 1 problems are usually simple, and it is really all about how fast can you solve it.

> In case you have never done AoC, it lasts for 25 days. Each day a new challenge is released. Each challenge has two parts, and you complete each one by providing an answer, usually a number. Your code doesn't really matter, only the answer.

## 6 am

For part one, all we have to do is parse the input into integers, and measure the rate of change from top to bottom. Once we have the rates of change, we count how many of these are positive.

Consider this input:

```
199
200
201
200
```

From top to bottom, the rates of change are `1, 1, -1`. The first entry of the input has nothing to be compared with. For an input of size `n` there's `n-1` rate of change.

At this point, one might rush and try to iterate over the input like so:

```rust
let inputs = aoc::get_input(2021, 1);

let rows = inputs
    .trim()
    .split("\n")
    .map(parse_num::<u32>)
    .collect::<Vec<_>>();

let mut answer = 0;

for index in 1..rows.len() {
    answer += if rows[index] > rows[index - 1] { 1 } else { 0 };
}
```

While this works well for part one, in part two, one has to consider rates of change between windows, of size 3. At this moment, if you want to finish fast, you ought to realize, that part one is just the same, but with windows of size 1.

In Rust there's a method to sum a list of integers, conveniently called, `sum`. Let's tweak the previous code to work with windows of size 1.

```rust
for index in 1..rows.len() - (1 - 1) {
      let current: u32 = rows[index..index + 1].iter().sum();
      let prev: u32 = rows[index - 1..(index - 1 + 1)].iter().sum();

      if current > prev {
          answer += 1;
      }
  }
```

The `index - 1 + 1`, and `- (1 - 1)`, should really bother you, but that's the key part, these two depend on the window size, `n`. Let's change that to 3.

```rust
let n = 3;
for index in 1..rows.len() - (n - 1) {
    let current: u32 = rows[index..index + n].iter().sum();
    let prev: u32 = rows[index - 1..(index - 1 + n)].iter().sum();

    if current > prev {
        answer += 1;
    }
}
```

And you are done! What's the time on the clock?!

## 6:30 am

In Rust, `Iterators` have a very neat method called `scan`, to which you provide an initial state, and a closure. The neat part is that `scan` keeps an internal state, while yielding elements into a new `Iterator`.

Ah, what?

```rust
let compare = |state: &mut usize, curr: &u32| {
        let result = *curr > rows[*state];
		// mutating the internal state
        *state += 1;
		// yield to the new iterator
        Some(result)
};

let part_one = rows[1..]
        .iter()
        .scan(0usize, compare)
        .filter(|x| *x)
        .count();
```

## Really, what??

There's a few things going on here, let's walk backwards, like a crab. The `count` method, well, lets us know how many elements are left after we run the `filter` method. The `filter` method, in this case, it's simply keeping true values generated from `scan`. It doesn't do any calculations of its own.

As said before, `scan` yields a new iterator, while keeping internal state. The elements on the new iterator are the result of comparing two elements. As the `scan` moves over the `rows`, each element is compared with, `rows[*state]`, where state starts at zero, and is increased by one every time.

Finally, we run the `scan` only over a `rows` iterator that starts from the second element.

Here comes the great insight.

While trying to solve the problem as fast as possible, we missed out on a fact. The difference of two windows, of any size, it's equal to the difference of the non-common terms. That is the first element of the first window, and the last element of the second window.

```
D + C + B - (C + B + A) = D - A
```

So, to solve part two:

```rust
let part_two = rows[3..]
        .iter()
        .scan(0usize, compare)
        .filter(|x| *x)
        .count();
```

We just need to start the same process from the fourth element on the `rows` vector, index 3.

## What's wrong with for-loops?

Absolutely nothing, the above just helps us to explore the available APIs on iterators, while also increasing our confidence in using Rust closures as first class citizens.

The for-loop that helped us at 6 am, could've been:

```rust
let mut n = 1;
let mut answer = 0;

// part one
for index in n..rows.len() {
    answer += if rows[index] > rows[index - n] { 1 } else { 0 };
}

println!("Part One: {}", answer);

// reset variables
answer = 0;
n = 3;

// part two
for index in n..rows.len() {
    answer += if rows[index] > rows[index - n] { 1 } else { 0 };
}

println!("Part Two: {}", answer);
```

At the end of the day, these things boil down to experience, cleverness, language proficiency, and why not, how excited were you about solving AoC once again!

Happy Hacking!
