'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Search, X, ExternalLink, Eye, Zap, Crown, Star } from 'lucide-react'

// Question type definition
interface Question {
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    title: string
    link: string
    topics: string
}

// Company questions data - keeping all your existing data
const companyQuestions: Record<string, Question[]> = {
    'AMD': [
        { difficulty: 'MEDIUM', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image', topics: 'Array, Math, Matrix' },
        { difficulty: 'MEDIUM', title: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix', topics: 'Array, Matrix, Simulation' },
        { difficulty: 'EASY', title: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits', topics: 'Divide and Conquer, Bit Manipulation' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs', topics: 'Math, Dynamic Programming, Memoization' },
        { difficulty: 'MEDIUM', title: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array', topics: 'Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect' },
        { difficulty: 'MEDIUM', title: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k', topics: 'Array, Hash Table, Prefix Sum' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
    ],
    'Airbnb': [
        { difficulty: 'HARD', title: 'Text Justification', link: 'https://leetcode.com/problems/text-justification', topics: 'Array, String, Simulation' },
        { difficulty: 'HARD', title: 'Maximum Profit in Job Scheduling', link: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling', topics: 'Array, Binary Search, Dynamic Programming, Sorting' },
        { difficulty: 'MEDIUM', title: 'Simple Bank System', link: 'https://leetcode.com/problems/simple-bank-system', topics: 'Array, Hash Table, Design, Simulation' },
        { difficulty: 'MEDIUM', title: 'Flatten 2D Vector', link: 'https://leetcode.com/problems/flatten-2d-vector', topics: 'Array, Two Pointers, Design, Iterator' },
        { difficulty: 'MEDIUM', title: 'Subarray Product Less Than K', link: 'https://leetcode.com/problems/subarray-product-less-than-k', topics: 'Array, Binary Search, Sliding Window, Prefix Sum' },
        { difficulty: 'HARD', title: 'Design Excel Sum Formula', link: 'https://leetcode.com/problems/design-excel-sum-formula', topics: 'Array, Hash Table, String, Graph, Design, Topological Sort, Matrix' },
        { difficulty: 'MEDIUM', title: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum', topics: 'Array, Backtracking' },
        { difficulty: 'MEDIUM', title: 'Design Tic-Tac-Toe', link: 'https://leetcode.com/problems/design-tic-tac-toe', topics: 'Array, Hash Table, Design, Matrix, Simulation' },
        { difficulty: 'MEDIUM', title: 'Shortest Uncommon Substring in an Array', link: 'https://leetcode.com/problems/shortest-uncommon-substring-in-an-array', topics: 'Array, Hash Table, String, Trie' },
        { difficulty: 'HARD', title: 'Palindrome Pairs', link: 'https://leetcode.com/problems/palindrome-pairs', topics: 'Array, Hash Table, String, Trie' },
        { difficulty: 'MEDIUM', title: 'Smallest Common Region', link: 'https://leetcode.com/problems/smallest-common-region', topics: 'Array, Hash Table, String, Tree, Depth-First Search, Breadth-First Search' },
        { difficulty: 'MEDIUM', title: 'Pour Water', link: 'https://leetcode.com/problems/pour-water', topics: 'Array, Simulation' },
        { difficulty: 'EASY', title: 'Can Place Flowers', link: 'https://leetcode.com/problems/can-place-flowers', topics: 'Array, Greedy' },
    ],
    'Amazon': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Reorganize String', link: 'https://leetcode.com/problems/reorganize-string', topics: 'Hash Table, String, Greedy, Sorting, Heap (Priority Queue), Counting' },
        { difficulty: 'MEDIUM', title: 'Maximum Frequency After Subarray Operation', link: 'https://leetcode.com/problems/maximum-frequency-after-subarray-operation', topics: 'Array, Hash Table, Dynamic Programming, Greedy, Enumeration, Prefix Sum' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers', topics: 'Linked List, Math, Recursion' },
        { difficulty: 'MEDIUM', title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Find First and Last Position of Element in Sorted Array', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array', topics: 'Array, Binary Search' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements', topics: 'Array, Hash Table, Divide and Conquer, Sorting, Heap (Priority Queue), Bucket Sort, Counting, Quickselect' },
        { difficulty: 'HARD', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists', topics: 'Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort' },
        { difficulty: 'MEDIUM', title: 'Jump Game II', link: 'https://leetcode.com/problems/jump-game-ii', topics: 'Array, Dynamic Programming, Greedy' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams', topics: 'Array, Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree', topics: 'Tree, Depth-First Search, Binary Tree' },
        { difficulty: 'MEDIUM', title: 'Longest Repeating Character Replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement', topics: 'Hash Table, String, Sliding Window' },
    ],
    'Adobe': [
        { difficulty: 'MEDIUM', title: 'Top K Frequent Words', link: 'https://leetcode.com/problems/top-k-frequent-words', topics: 'Array, Hash Table, String, Trie, Sorting, Heap (Priority Queue), Bucket Sort, Counting' },
        { difficulty: 'MEDIUM', title: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements', topics: 'Array, Hash Table, Divide and Conquer, Sorting, Heap (Priority Queue), Bucket Sort, Counting, Quickselect' },
        { difficulty: 'HARD', title: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix', topics: 'Array, Dynamic Programming, Depth-First Search, Breadth-First Search, Graph, Topological Sort, Memoization, Matrix' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Integer to Roman', link: 'https://leetcode.com/problems/integer-to-roman', topics: 'Hash Table, Math, String' },
        { difficulty: 'HARD', title: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder', topics: 'Hash Table, String, Breadth-First Search' },
        { difficulty: 'HARD', title: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Rotting Oranges', link: 'https://leetcode.com/problems/rotting-oranges', topics: 'Array, Breadth-First Search, Matrix' },
        { difficulty: 'EASY', title: 'Split the Array', link: 'https://leetcode.com/problems/split-the-array', topics: 'Array, Hash Table, Counting' },
    ],
    'Airtel': [
        { difficulty: 'MEDIUM', title: 'Find Polygon With the Largest Perimeter', link: 'https://leetcode.com/problems/find-polygon-with-the-largest-perimeter', topics: 'Array, Greedy, Sorting, Prefix Sum' },
        { difficulty: 'MEDIUM', title: 'XOR Queries of a Subarray', link: 'https://leetcode.com/problems/xor-queries-of-a-subarray', topics: 'Array, Bit Manipulation, Prefix Sum' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses', topics: 'String, Dynamic Programming, Backtracking' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Find First and Last Position of Element in Sorted Array', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array', topics: 'Array, Binary Search' },
    ],
    'American Express': [
        { difficulty: 'MEDIUM', title: 'Minimum Number of Operations to Make Array XOR Equal to K', link: 'https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k', topics: 'Array, Bit Manipulation' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Minimum Deletions to Make Character Frequencies Unique', link: 'https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique', topics: 'Hash Table, String, Greedy, Sorting' },
        { difficulty: 'EASY', title: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome', topics: 'Two Pointers, String' },
        { difficulty: 'EASY', title: 'Add Digits', link: 'https://leetcode.com/problems/add-digits', topics: 'Math, Simulation, Number Theory' },
        { difficulty: 'EASY', title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram', topics: 'Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'HARD', title: 'Maximum Equal Frequency', link: 'https://leetcode.com/problems/maximum-equal-frequency', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Minimum Fuel Cost to Report to the Capital', link: 'https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital', topics: 'Tree, Depth-First Search, Breadth-First Search, Graph' },
        { difficulty: 'MEDIUM', title: 'Ugly Number III', link: 'https://leetcode.com/problems/ugly-number-iii', topics: 'Math, Binary Search, Combinatorics, Number Theory' },
        { difficulty: 'EASY', title: 'Divide an Array Into Subarrays With Minimum Cost I', link: 'https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i', topics: 'Array, Sorting, Enumeration' },
        { difficulty: 'EASY', title: 'Percentage of Letter in String', link: 'https://leetcode.com/problems/percentage-of-letter-in-string', topics: 'String' },
        { difficulty: 'HARD', title: 'Divide an Array Into Subarrays With Minimum Cost II', link: 'https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii', topics: 'Array, Hash Table, Sliding Window, Heap (Priority Queue)' },
        { difficulty: 'MEDIUM', title: 'Maximum XOR After Operations', link: 'https://leetcode.com/problems/maximum-xor-after-operations', topics: 'Array, Math, Bit Manipulation' },
        { difficulty: 'MEDIUM', title: 'Equal Sum Arrays With Minimum Number of Operations', link: 'https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations', topics: 'Array, Hash Table, Greedy, Counting' },
    ],
    'Accenture': [
        { difficulty: 'MEDIUM', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Move Zeroes', link: 'https://leetcode.com/problems/move-zeroes', topics: 'Array, Two Pointers' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'HARD', title: 'Divide Nodes Into the Maximum Number of Groups', link: 'https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups', topics: 'Depth-First Search, Breadth-First Search, Union Find, Graph' },
        { difficulty: 'EASY', title: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number', topics: 'Math, Dynamic Programming, Recursion, Memoization' },
        { difficulty: 'EASY', title: 'Majority Element', link: 'https://leetcode.com/problems/majority-element', topics: 'Array, Hash Table, Divide and Conquer, Sorting, Counting' },
        { difficulty: 'EASY', title: 'Intersection of Two Arrays', link: 'https://leetcode.com/problems/intersection-of-two-arrays', topics: 'Array, Hash Table, Two Pointers, Binary Search, Sorting' },
        { difficulty: 'MEDIUM', title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas', topics: 'Array, Binary Search' },
        { difficulty: 'EASY', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs', topics: 'Math, Dynamic Programming, Memoization' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
    ],
    'Apple': [
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements', topics: 'Array, Hash Table, Divide and Conquer, Sorting, Heap (Priority Queue), Bucket Sort, Counting, Quickselect' },
        { difficulty: 'MEDIUM', title: 'Best Time to Buy and Sell Stock II', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii', topics: 'Array, Dynamic Programming, Greedy' },
        { difficulty: 'EASY', title: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix', topics: 'String, Trie' },
        { difficulty: 'MEDIUM', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
        { difficulty: 'HARD', title: 'Best Time to Buy and Sell Stock III', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array', topics: 'Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect' },
        { difficulty: 'HARD', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists', topics: 'Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image', topics: 'Array, Math, Matrix' },
        { difficulty: 'HARD', title: 'Best Time to Buy and Sell Stock IV', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
    ],
    'Autodesk': [
        { difficulty: 'EASY', title: 'Majority Element', link: 'https://leetcode.com/problems/majority-element', topics: 'Array, Hash Table, Divide and Conquer, Sorting, Counting' },
        { difficulty: 'MEDIUM', title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes', topics: 'Array, Hash Table, Matrix' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Elimination Game', link: 'https://leetcode.com/problems/elimination-game', topics: 'Math, Recursion' },
        { difficulty: 'MEDIUM', title: 'Number of Subarrays That Match a Pattern I', link: 'https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i', topics: 'Array, Rolling Hash, String Matching, Hash Function' },
        { difficulty: 'MEDIUM', title: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
    ],
    'BharatPay': [
        { difficulty: 'MEDIUM', title: 'Maximal Square', link: 'https://leetcode.com/problems/maximal-square', topics: 'Array, Dynamic Programming, Matrix' },
        { difficulty: 'MEDIUM', title: 'Car Fleet', link: 'https://leetcode.com/problems/car-fleet', topics: 'Array, Stack, Sorting, Monotonic Stack' },
    ],
    'Bolt': [
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'HARD', title: 'Best Time to Buy and Sell Stock III', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii', topics: 'Array, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'EASY', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs', topics: 'Math, Dynamic Programming, Memoization' },
        { difficulty: 'EASY', title: 'Check if All Characters Have Equal Number of Occurrences', link: 'https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences', topics: 'Hash Table, String, Counting' },
    ],
    'Booking.com': [
        { difficulty: 'MEDIUM', title: 'Integer to Roman', link: 'https://leetcode.com/problems/integer-to-roman', topics: 'Hash Table, Math, String' },
        { difficulty: 'HARD', title: 'Reconstruct Itinerary', link: 'https://leetcode.com/problems/reconstruct-itinerary', topics: 'Depth-First Search, Graph, Eulerian Circuit' },
        { difficulty: 'MEDIUM', title: 'Permutations', link: 'https://leetcode.com/problems/permutations', topics: 'Array, Backtracking' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
    ],
    'Bank of America': [
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome', topics: 'Two Pointers, String' },
    ],
    'BlackRock': [
        { difficulty: 'EASY', title: 'Happy Number', link: 'https://leetcode.com/problems/happy-number', topics: 'Hash Table, Math, Two Pointers' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'MEDIUM', title: 'Evaluate Division', link: 'https://leetcode.com/problems/evaluate-division', topics: 'Array, String, Depth-First Search, Breadth-First Search, Union Find, Graph, Shortest Path' },
        { difficulty: 'MEDIUM', title: 'Maximum Subtree of the Same Color', link: 'https://leetcode.com/problems/maximum-subtree-of-the-same-color', topics: 'Array, Dynamic Programming, Tree, Depth-First Search' },
        { difficulty: 'HARD', title: 'Find the Maximum Sum of Node Values', link: 'https://leetcode.com/problems/find-the-maximum-sum-of-node-values', topics: 'Array, Dynamic Programming, Greedy, Bit Manipulation, Tree, Sorting' },
        { difficulty: 'MEDIUM', title: 'Pairs of Songs With Total Durations Divisible by 60', link: 'https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60', topics: 'Array, Hash Table, Counting' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams', topics: 'Array, Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Path with Maximum Probability', link: 'https://leetcode.com/problems/path-with-maximum-probability', topics: 'Array, Graph, Heap (Priority Queue), Shortest Path' },
        { difficulty: 'MEDIUM', title: 'Maximize Greatness of an Array', link: 'https://leetcode.com/problems/maximize-greatness-of-an-array', topics: 'Array, Two Pointers, Greedy, Sorting' },
        { difficulty: 'EASY', title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram', topics: 'Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Boundary of Binary Tree', link: 'https://leetcode.com/problems/boundary-of-binary-tree', topics: 'Tree, Depth-First Search, Binary Tree' },
        { difficulty: 'MEDIUM', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change', topics: 'Array, Dynamic Programming, Breadth-First Search' },
        { difficulty: 'MEDIUM', title: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses', topics: 'String, Dynamic Programming, Backtracking' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Maximum Profit From Trading Stocks', link: 'https://leetcode.com/problems/maximum-profit-from-trading-stocks', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
    ],
    'Box': [
        { difficulty: 'EASY', title: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits', topics: 'Divide and Conquer, Bit Manipulation' },
        { difficulty: 'MEDIUM', title: 'Top K Frequent Words', link: 'https://leetcode.com/problems/top-k-frequent-words', topics: 'Array, Hash Table, String, Trie, Sorting, Heap (Priority Queue), Bucket Sort, Counting' },
        { difficulty: 'HARD', title: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder', topics: 'Hash Table, String, Breadth-First Search' },
        { difficulty: 'EASY', title: 'Kth Largest Element in a Stream', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream', topics: 'Tree, Design, Binary Search Tree, Heap (Priority Queue), Binary Tree, Data Stream' },
        { difficulty: 'MEDIUM', title: 'Event Emitter', link: 'https://leetcode.com/problems/event-emitter', topics: '' },
    ],
    'Cars24': [
        { difficulty: 'MEDIUM', title: 'Time Based Key-Value Store', link: 'https://leetcode.com/problems/time-based-key-value-store', topics: 'Hash Table, String, Binary Search, Design' },
        { difficulty: 'MEDIUM', title: 'Online Election', link: 'https://leetcode.com/problems/online-election', topics: 'Array, Hash Table, Binary Search, Design' },
        { difficulty: 'MEDIUM', title: 'Open the Lock', link: 'https://leetcode.com/problems/open-the-lock', topics: 'Array, Hash Table, String, Breadth-First Search' },
        { difficulty: 'MEDIUM', title: 'Rabbits in Forest', link: 'https://leetcode.com/problems/rabbits-in-forest', topics: 'Array, Hash Table, Math, Greedy' },
        { difficulty: 'EASY', title: 'Counter', link: 'https://leetcode.com/problems/counter', topics: '' },
        { difficulty: 'MEDIUM', title: 'Bulls and Cows', link: 'https://leetcode.com/problems/bulls-and-cows', topics: 'Hash Table, String, Counting' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: 'House Robber', link: 'https://leetcode.com/problems/house-robber', topics: 'Array, Dynamic Programming' },
    ],
    'Capital One': [
        { difficulty: 'MEDIUM', title: 'Minimum Operations to Write the Letter Y on a Grid', link: 'https://leetcode.com/problems/minimum-operations-to-write-the-letter-y-on-a-grid', topics: 'Array, Hash Table, Matrix, Counting' },
        { difficulty: 'HARD', title: 'Block Placement Queries', link: 'https://leetcode.com/problems/block-placement-queries', topics: 'Array, Binary Search, Binary Indexed Tree, Segment Tree' },
        { difficulty: 'MEDIUM', title: 'Rotating the Box', link: 'https://leetcode.com/problems/rotating-the-box', topics: 'Array, Two Pointers, Matrix' },
        { difficulty: 'MEDIUM', title: 'Simple Bank System', link: 'https://leetcode.com/problems/simple-bank-system', topics: 'Array, Hash Table, Design, Simulation' },
        { difficulty: 'MEDIUM', title: 'Number of Black Blocks', link: 'https://leetcode.com/problems/number-of-black-blocks', topics: 'Array, Hash Table, Enumeration' },
        { difficulty: 'MEDIUM', title: 'Candy Crush', link: 'https://leetcode.com/problems/candy-crush', topics: 'Array, Two Pointers, Matrix, Simulation' },
        { difficulty: 'MEDIUM', title: 'Number of Subarrays That Match a Pattern I', link: 'https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i', topics: 'Array, Rolling Hash, String Matching, Hash Function' },
        { difficulty: 'HARD', title: 'Count Prefix and Suffix Pairs II', link: 'https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii', topics: 'Array, String, Trie, Rolling Hash, String Matching, Hash Function' },
        { difficulty: 'HARD', title: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram', topics: 'Array, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Simplify Path', link: 'https://leetcode.com/problems/simplify-path', topics: 'String, Stack' },
        { difficulty: 'MEDIUM', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image', topics: 'Array, Math, Matrix' },
        { difficulty: 'MEDIUM', title: 'Number of Adjacent Elements With the Same Color', link: 'https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color', topics: 'Array' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix', topics: 'Array, Matrix, Simulation' },
    ],
    'Cloudflare': [
        { difficulty: 'HARD', title: 'Reaching Points', link: 'https://leetcode.com/problems/reaching-points', topics: 'Math' },
        { difficulty: 'MEDIUM', title: 'Design Circular Queue', link: 'https://leetcode.com/problems/design-circular-queue', topics: 'Array, Linked List, Design, Queue' },
        { difficulty: 'MEDIUM', title: 'Design a Stack With Increment Operation', link: 'https://leetcode.com/problems/design-a-stack-with-increment-operation', topics: 'Array, Stack, Design' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: '4Sum', link: 'https://leetcode.com/problems/4sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: 'Design Hit Counter', link: 'https://leetcode.com/problems/design-hit-counter', topics: 'Array, Binary Search, Design, Queue, Data Stream' },
    ],
    'Cognizant': [
        { difficulty: 'EASY', title: 'Count Subarrays of Length Three With a Condition', link: 'https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition', topics: 'Array' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Remove Duplicates from Sorted Array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', topics: 'Array, Two Pointers' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram', topics: 'Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Second Highest Salary', link: 'https://leetcode.com/problems/second-highest-salary', topics: 'Database' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'EASY', title: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number', topics: 'Math' },
    ],
    'Coinbase': [
        { difficulty: 'MEDIUM', title: 'Simple Bank System', link: 'https://leetcode.com/problems/simple-bank-system', topics: 'Array, Hash Table, Design, Simulation' },
        { difficulty: 'MEDIUM', title: 'Time Based Key-Value Store', link: 'https://leetcode.com/problems/time-based-key-value-store', topics: 'Hash Table, String, Binary Search, Design' },
        { difficulty: 'MEDIUM', title: 'Zigzag Iterator', link: 'https://leetcode.com/problems/zigzag-iterator', topics: 'Array, Design, Queue, Iterator' },
    ],
    'Credit Karma': [
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Monotone Increasing Digits', link: 'https://leetcode.com/problems/monotone-increasing-digits', topics: 'Math, Greedy' },
        { difficulty: 'MEDIUM', title: 'Basic Calculator II', link: 'https://leetcode.com/problems/basic-calculator-ii', topics: 'Math, String, Stack' },
    ],
    'Dell': [
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'HARD', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists', topics: 'Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Delete Duplicate Emails', link: 'https://leetcode.com/problems/delete-duplicate-emails', topics: 'Database' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
    ],
    'Duolingo': [
        { difficulty: 'HARD', title: 'Encrypt and Decrypt Strings', link: 'https://leetcode.com/problems/encrypt-and-decrypt-strings', topics: 'Array, Hash Table, String, Design, Trie' },
        { difficulty: 'MEDIUM', title: 'Minimum Number of People to Teach', link: 'https://leetcode.com/problems/minimum-number-of-people-to-teach', topics: 'Array, Hash Table, Greedy' },
        { difficulty: 'MEDIUM', title: 'K Radius Subarray Averages', link: 'https://leetcode.com/problems/k-radius-subarray-averages', topics: 'Array, Sliding Window' },
    ],
    'Dropbox': [
        { difficulty: 'MEDIUM', title: 'Max Area of Island', link: 'https://leetcode.com/problems/max-area-of-island', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Simple Bank System', link: 'https://leetcode.com/problems/simple-bank-system', topics: 'Array, Hash Table, Design, Simulation' },
        { difficulty: 'MEDIUM', title: 'Find Duplicate File in System', link: 'https://leetcode.com/problems/find-duplicate-file-in-system', topics: 'Array, Hash Table, String' },
        { difficulty: 'MEDIUM', title: 'Game of Life', link: 'https://leetcode.com/problems/game-of-life', topics: 'Array, Matrix, Simulation' },
        { difficulty: 'MEDIUM', title: 'Seat Reservation Manager', link: 'https://leetcode.com/problems/seat-reservation-manager', topics: 'Design, Heap (Priority Queue)' },
        { difficulty: 'MEDIUM', title: 'Web Crawler Multithreaded', link: 'https://leetcode.com/problems/web-crawler-multithreaded', topics: 'Depth-First Search, Breadth-First Search, Concurrency' },
        { difficulty: 'MEDIUM', title: 'Web Crawler', link: 'https://leetcode.com/problems/web-crawler', topics: 'String, Depth-First Search, Breadth-First Search, Interactive' },
        { difficulty: 'HARD', title: 'Design a Text Editor', link: 'https://leetcode.com/problems/design-a-text-editor', topics: 'Linked List, String, Stack, Design, Simulation, Doubly-Linked List' },
        { difficulty: 'HARD', title: 'Grid Illumination', link: 'https://leetcode.com/problems/grid-illumination', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', topics: 'Hash Table, String, Backtracking' },
        { difficulty: 'HARD', title: 'Word Break II', link: 'https://leetcode.com/problems/word-break-ii', topics: 'Array, Hash Table, String, Dynamic Programming, Backtracking, Trie, Memoization' },
        { difficulty: 'MEDIUM', title: 'Design Hit Counter', link: 'https://leetcode.com/problems/design-hit-counter', topics: 'Array, Binary Search, Design, Queue, Data Stream' },
        { difficulty: 'HARD', title: 'Minimize Malware Spread II', link: 'https://leetcode.com/problems/minimize-malware-spread-ii', topics: 'Array, Hash Table, Depth-First Search, Breadth-First Search, Union Find, Graph' },
        { difficulty: 'EASY', title: 'Word Pattern', link: 'https://leetcode.com/problems/word-pattern', topics: 'Hash Table, String' },
        { difficulty: 'MEDIUM', title: 'Word Pattern II', link: 'https://leetcode.com/problems/word-pattern-ii', topics: 'Hash Table, String, Backtracking' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'HARD', title: 'Number of Valid Words for Each Puzzle', link: 'https://leetcode.com/problems/number-of-valid-words-for-each-puzzle', topics: 'Array, Hash Table, String, Bit Manipulation, Trie' },
    ],
    'Dream11': [
        { difficulty: 'MEDIUM', title: 'Furthest Building You Can Reach', link: 'https://leetcode.com/problems/furthest-building-you-can-reach', topics: 'Array, Greedy, Heap (Priority Queue)' },
        { difficulty: 'HARD', title: 'Shortest Common Supersequence', link: 'https://leetcode.com/problems/shortest-common-supersequence', topics: 'String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Minimum Falling Path Sum', link: 'https://leetcode.com/problems/minimum-falling-path-sum', topics: 'Array, Dynamic Programming, Matrix' },
        { difficulty: 'EASY', title: 'Final Prices With a Special Discount in a Shop', link: 'https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop', topics: 'Array, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Gas Station', link: 'https://leetcode.com/problems/gas-station', topics: 'Array, Greedy' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: 'Number of Ways to Select Buildings', link: 'https://leetcode.com/problems/number-of-ways-to-select-buildings', topics: 'String, Dynamic Programming, Prefix Sum' },
        { difficulty: 'HARD', title: 'Minimum Number of Increments on Subarrays to Form a Target Array', link: 'https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array', topics: 'Array, Dynamic Programming, Stack, Greedy, Monotonic Stack' },
    ],
    'Flipkart': [
        { difficulty: 'MEDIUM', title: 'Transform Array to All Equal Elements', link: 'https://leetcode.com/problems/transform-array-to-all-equal-elements', topics: 'Array, Greedy' },
        { difficulty: 'MEDIUM', title: 'Gas Station', link: 'https://leetcode.com/problems/gas-station', topics: 'Array, Greedy' },
        { difficulty: 'MEDIUM', title: 'Ways to Split Array Into Good Subarrays', link: 'https://leetcode.com/problems/ways-to-split-array-into-good-subarrays', topics: 'Array, Math, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance', topics: 'String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: '3Sum Closest', link: 'https://leetcode.com/problems/3sum-closest', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii', topics: 'Depth-First Search, Breadth-First Search, Graph, Topological Sort' },
        { difficulty: 'MEDIUM', title: 'Sum of Subarray Minimums', link: 'https://leetcode.com/problems/sum-of-subarray-minimums', topics: 'Array, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Magnetic Force Between Two Balls', link: 'https://leetcode.com/problems/magnetic-force-between-two-balls', topics: 'Array, Binary Search, Sorting' },
        { difficulty: 'MEDIUM', title: 'Capacity To Ship Packages Within D Days', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days', topics: 'Array, Binary Search' },
    ],
    'Fiverr': [
        { difficulty: 'MEDIUM', title: 'Subsets', link: 'https://leetcode.com/problems/subsets', topics: 'Array, Backtracking, Bit Manipulation' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
    ],
    'Freshworks': [
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', topics: 'Hash Table, String, Backtracking' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'EASY', title: 'Maximum Product of Three Numbers', link: 'https://leetcode.com/problems/maximum-product-of-three-numbers', topics: 'Array, Math, Sorting' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
    ],
    'FreeCharge': [
        { difficulty: 'MEDIUM', title: 'Gas Station', link: 'https://leetcode.com/problems/gas-station', topics: 'Array, Greedy' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
    ],
    'Goldman Sachs': [
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'EASY', title: 'High Five', link: 'https://leetcode.com/problems/high-five', topics: 'Array, Hash Table, Sorting, Heap (Priority Queue)' },
        { difficulty: 'MEDIUM', title: 'Fraction to Recurring Decimal', link: 'https://leetcode.com/problems/fraction-to-recurring-decimal', topics: 'Hash Table, Math, String' },
        { difficulty: 'MEDIUM', title: 'Minimum Path Sum', link: 'https://leetcode.com/problems/minimum-path-sum', topics: 'Array, Dynamic Programming, Matrix' },
        { difficulty: 'MEDIUM', title: 'Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold', link: 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold', topics: 'Array, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Car Pooling', link: 'https://leetcode.com/problems/car-pooling', topics: 'Array, Sorting, Heap (Priority Queue), Simulation, Prefix Sum' },
        { difficulty: 'EASY', title: 'First Unique Character in a String', link: 'https://leetcode.com/problems/first-unique-character-in-a-string', topics: 'Hash Table, String, Queue, Counting' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Robot Return to Origin', link: 'https://leetcode.com/problems/robot-return-to-origin', topics: 'String, Simulation' },
        { difficulty: 'MEDIUM', title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water', topics: 'Array, Two Pointers, Greedy' },
    ],
    'Google': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number', topics: 'Math' },
        { difficulty: 'MEDIUM', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers', topics: 'Linked List, Math, Recursion' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix', topics: 'String, Trie' },
        { difficulty: 'MEDIUM', title: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence', topics: 'Array, Hash Table, Union Find' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: '4Sum', link: 'https://leetcode.com/problems/4sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: 'Zigzag Conversion', link: 'https://leetcode.com/problems/zigzag-conversion', topics: 'String' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'MEDIUM', title: 'Top K Frequent Words', link: 'https://leetcode.com/problems/top-k-frequent-words', topics: 'Array, Hash Table, String, Trie, Sorting, Heap (Priority Queue), Bucket Sort, Counting' },
        { difficulty: 'EASY', title: 'Single Number', link: 'https://leetcode.com/problems/single-number', topics: 'Array, Bit Manipulation' },
        { difficulty: 'MEDIUM', title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water', topics: 'Array, Two Pointers, Greedy' },
        { difficulty: 'EASY', title: 'Remove Duplicates from Sorted Array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', topics: 'Array, Two Pointers' },
        { difficulty: 'MEDIUM', title: 'Next Permutation', link: 'https://leetcode.com/problems/next-permutation', topics: 'Array, Two Pointers' },
        { difficulty: 'HARD', title: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum', topics: 'Array, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue' },
        { difficulty: 'EASY', title: "Pascal's Triangle", link: 'https://leetcode.com/problems/pascals-triangle', topics: 'Array, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Diameter of Binary Tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree', topics: 'Tree, Depth-First Search, Binary Tree' },
        { difficulty: 'HARD', title: 'Number of Visible People in a Queue', link: 'https://leetcode.com/problems/number-of-visible-people-in-a-queue', topics: 'Array, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Find Peak Element', link: 'https://leetcode.com/problems/find-peak-element', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'HARD', title: 'Russian Doll Envelopes', link: 'https://leetcode.com/problems/russian-doll-envelopes', topics: 'Array, Binary Search, Dynamic Programming, Sorting' },
        { difficulty: 'MEDIUM', title: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes', topics: 'Array, Hash Table, Matrix' },
        { difficulty: 'EASY', title: 'Move Zeroes', link: 'https://leetcode.com/problems/move-zeroes', topics: 'Array, Two Pointers' },
    ],
    'Grammarly': [
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'EASY', title: 'Perfect Number', link: 'https://leetcode.com/problems/perfect-number', topics: 'Math' },
        { difficulty: 'MEDIUM', title: 'Repeated DNA Sequences', link: 'https://leetcode.com/problems/repeated-dna-sequences', topics: 'Hash Table, String, Bit Manipulation, Sliding Window, Rolling Hash, Hash Function' },
        { difficulty: 'MEDIUM', title: 'Vowel Spellchecker', link: 'https://leetcode.com/problems/vowel-spellchecker', topics: 'Array, Hash Table, String' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Insert Delete GetRandom O(1)', link: 'https://leetcode.com/problems/insert-delete-getrandom-o1', topics: 'Array, Hash Table, Math, Design, Randomized' },
        { difficulty: 'MEDIUM', title: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses', topics: 'String, Dynamic Programming, Backtracking' },
        { difficulty: 'MEDIUM', title: 'Unique Paths', link: 'https://leetcode.com/problems/unique-paths', topics: 'Math, Dynamic Programming, Combinatorics' },
    ],
    'Groww': [
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Minimum Number of Operations to Make X and Y Equal', link: 'https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal', topics: 'Dynamic Programming, Breadth-First Search, Memoization' },
        { difficulty: 'MEDIUM', title: 'Maximum Good Subarray Sum', link: 'https://leetcode.com/problems/maximum-good-subarray-sum', topics: 'Array, Hash Table, Prefix Sum' },
    ],
    'GoDaddy': [
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: 'String Compression', link: 'https://leetcode.com/problems/string-compression', topics: 'Two Pointers, String' },
        { difficulty: 'MEDIUM', title: 'Permutations', link: 'https://leetcode.com/problems/permutations', topics: 'Array, Backtracking' },
        { difficulty: 'EASY', title: 'Arranging Coins', link: 'https://leetcode.com/problems/arranging-coins', topics: 'Math, Binary Search' },
    ],
    'Grab': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Search a 2D Matrix', link: 'https://leetcode.com/problems/search-a-2d-matrix', topics: 'Array, Binary Search, Matrix' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Minimum Cost For Tickets', link: 'https://leetcode.com/problems/minimum-cost-for-tickets', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Reconstruct a 2-Row Binary Matrix', link: 'https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix', topics: 'Array, Greedy, Matrix' },
        { difficulty: 'MEDIUM', title: 'Adding Two Negabinary Numbers', link: 'https://leetcode.com/problems/adding-two-negabinary-numbers', topics: 'Array, Math' },
        { difficulty: 'MEDIUM', title: 'Minimum Number of Food Buckets to Feed the Hamsters', link: 'https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters', topics: 'String, Dynamic Programming, Greedy' },
    ],
    'HCL': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Reverse Integer', link: 'https://leetcode.com/problems/reverse-integer', topics: 'Math' },
        { difficulty: 'EASY', title: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number', topics: 'Math' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
    ],
    'HP': [
        { difficulty: 'MEDIUM', title: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix', topics: 'Array, Matrix, Simulation' },
        { difficulty: 'MEDIUM', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image', topics: 'Array, Math, Matrix' },
        { difficulty: 'MEDIUM', title: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self', topics: 'Array, Prefix Sum' },
    ],
    'Hotstar': [
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache', topics: 'Hash Table, Linked List, Design, Doubly-Linked List' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
    ],
    'Honeywell': [
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'String Compression', link: 'https://leetcode.com/problems/string-compression', topics: 'Two Pointers, String' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
    ],
    'Huawei': [
        { difficulty: 'MEDIUM', title: 'Restore IP Addresses', link: 'https://leetcode.com/problems/restore-ip-addresses', topics: 'String, Backtracking' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Multiply Strings', link: 'https://leetcode.com/problems/multiply-strings', topics: 'Math, String, Simulation' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Minimum Time Difference', link: 'https://leetcode.com/problems/minimum-time-difference', topics: 'Array, Math, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Maximal Square', link: 'https://leetcode.com/problems/maximal-square', topics: 'Array, Dynamic Programming, Matrix' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists', topics: 'Linked List, Recursion' },
        { difficulty: 'MEDIUM', title: 'Check If Array Pairs Are Divisible by k', link: 'https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k', topics: 'Array, Hash Table, Counting' },
        { difficulty: 'MEDIUM', title: 'Reverse Words in a String', link: 'https://leetcode.com/problems/reverse-words-in-a-string', topics: 'Two Pointers, String' },
        { difficulty: 'MEDIUM', title: 'Maximum Length of Pair Chain', link: 'https://leetcode.com/problems/maximum-length-of-pair-chain', topics: 'Array, Dynamic Programming, Greedy, Sorting' },
        { difficulty: 'MEDIUM', title: 'Permutations', link: 'https://leetcode.com/problems/permutations', topics: 'Array, Backtracking' },
        { difficulty: 'MEDIUM', title: 'UTF-8 Validation', link: 'https://leetcode.com/problems/utf-8-validation', topics: 'Array, Bit Manipulation' },
    ],
    'IBM': [
        { difficulty: 'MEDIUM', title: 'Triples with Bitwise AND Equal To Zero', link: 'https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero', topics: 'Array, Hash Table, Bit Manipulation' },
        { difficulty: 'MEDIUM', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'EASY', title: 'Fizz Buzz', link: 'https://leetcode.com/problems/fizz-buzz', topics: 'Math, String, Simulation' },
        { difficulty: 'MEDIUM', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers', topics: 'Linked List, Math, Recursion' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self', topics: 'Array, Prefix Sum' },
        { difficulty: 'MEDIUM', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams', topics: 'Array, Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Analyze User Website Visit Pattern', link: 'https://leetcode.com/problems/analyze-user-website-visit-pattern', topics: 'Array, Hash Table, Sorting' },
        { difficulty: 'MEDIUM', title: 'Partition Labels', link: 'https://leetcode.com/problems/partition-labels', topics: 'Hash Table, Two Pointers, String, Greedy' },
        { difficulty: 'MEDIUM', title: 'Copy List with Random Pointer', link: 'https://leetcode.com/problems/copy-list-with-random-pointer', topics: 'Hash Table, Linked List' },
        { difficulty: 'EASY', title: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists', topics: 'Linked List, Recursion' },
        { difficulty: 'MEDIUM', title: 'Design Circular Queue', link: 'https://leetcode.com/problems/design-circular-queue', topics: 'Array, Linked List, Design, Queue' },
        { difficulty: 'MEDIUM', title: 'Design Browser History', link: 'https://leetcode.com/problems/design-browser-history', topics: 'Array, Linked List, Stack, Design, Doubly-Linked List, Data Stream' },
        { difficulty: 'MEDIUM', title: 'Zigzag Conversion', link: 'https://leetcode.com/problems/zigzag-conversion', topics: 'String' },
        { difficulty: 'MEDIUM', title: 'String to Integer (atoi)', link: 'https://leetcode.com/problems/string-to-integer-atoi', topics: 'String' },
        { difficulty: 'MEDIUM', title: 'Find the Winner of the Circular Game', link: 'https://leetcode.com/problems/find-the-winner-of-the-circular-game', topics: 'Array, Math, Recursion, Queue, Simulation' },
    ],
    'IIT Bombay': [
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
    ],
    'IMC': [
        { difficulty: 'MEDIUM', title: 'Design Tic-Tac-Toe', link: 'https://leetcode.com/problems/design-tic-tac-toe', topics: 'Array, Hash Table, Design, Matrix, Simulation' },
        { difficulty: 'MEDIUM', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands', topics: 'Array, Depth-First Search, Breadth-First Search, Union Find, Matrix' },
        { difficulty: 'MEDIUM', title: 'Busy Student', link: 'https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time', topics: 'Array' },
        { difficulty: 'MEDIUM', title: 'Robot Bounded In Circle', link: 'https://leetcode.com/problems/robot-bounded-in-circle', topics: 'Math, String, Simulation' },
        { difficulty: 'HARD', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water', topics: 'Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack' },
        { difficulty: 'MEDIUM', title: 'Valid Square', link: 'https://leetcode.com/problems/valid-square', topics: 'Math, Geometry' },
        { difficulty: 'MEDIUM', title: 'Simplify Path', link: 'https://leetcode.com/problems/simplify-path', topics: 'String, Stack' },
    ],
    'INDmoney': [
        { difficulty: 'MEDIUM', title: 'House Robber', link: 'https://leetcode.com/problems/house-robber', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change', topics: 'Array, Dynamic Programming, Breadth-First Search' },
    ],
    'InMobi': [
        { difficulty: 'MEDIUM', title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule', topics: 'Depth-First Search, Breadth-First Search, Graph, Topological Sort' },
        { difficulty: 'MEDIUM', title: 'Word Break', link: 'https://leetcode.com/problems/word-break', topics: 'Hash Table, String, Dynamic Programming, Trie, Memoization' },
        { difficulty: 'MEDIUM', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change', topics: 'Array, Dynamic Programming, Breadth-First Search' },
        { difficulty: 'MEDIUM', title: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence', topics: 'Array, Binary Search, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray', topics: 'Array, Dynamic Programming' },
        { difficulty: 'HARD', title: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance', topics: 'String, Dynamic Programming' },
    ],
    'Indeed': [
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'MEDIUM', title: 'Basic Calculator II', link: 'https://leetcode.com/problems/basic-calculator-ii', topics: 'Math, String, Stack' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'MEDIUM', title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule', topics: 'Depth-First Search, Breadth-First Search, Graph, Topological Sort' },
        { difficulty: 'MEDIUM', title: 'Word Break', link: 'https://leetcode.com/problems/word-break', topics: 'Hash Table, String, Dynamic Programming, Trie, Memoization' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Subdomain Visit Count', link: 'https://leetcode.com/problems/subdomain-visit-count', topics: 'Array, Hash Table, String, Counting' },
    ],
    'Info Edge': [
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'MEDIUM', title: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array', topics: 'Array, Binary Search' },
        { difficulty: 'MEDIUM', title: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal', topics: 'Tree, Breadth-First Search, Binary Tree' },
        { difficulty: 'MEDIUM', title: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array', topics: 'Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect' },
    ],
    'Infosys': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number', topics: 'Math' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
        { difficulty: 'EASY', title: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix', topics: 'String, Trie' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'EASY', title: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists', topics: 'Linked List, Recursion' },
        { difficulty: 'EASY', title: 'Remove Duplicates from Sorted Array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', topics: 'Array, Two Pointers' },
        { difficulty: 'EASY', title: 'Remove Element', link: 'https://leetcode.com/problems/remove-element', topics: 'Array, Two Pointers' },
        { difficulty: 'EASY', title: 'Search Insert Position', link: 'https://leetcode.com/problems/search-insert-position', topics: 'Array, Binary Search' },
        { difficulty: 'EASY', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Length of Last Word', link: 'https://leetcode.com/problems/length-of-last-word', topics: 'String' },
        { difficulty: 'EASY', title: 'Plus One', link: 'https://leetcode.com/problems/plus-one', topics: 'Array, Math' },
        { difficulty: 'EASY', title: 'Add Binary', link: 'https://leetcode.com/problems/add-binary', topics: 'Math, String, Bit Manipulation, Simulation' },
        { difficulty: 'EASY', title: 'Sqrt(x)', link: 'https://leetcode.com/problems/sqrtx', topics: 'Math, Binary Search' },
        { difficulty: 'EASY', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs', topics: 'Math, Dynamic Programming, Memoization' },
    ],
    'Intel': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers', topics: 'Linked List, Math, Recursion' },
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'MEDIUM', title: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring', topics: 'Two Pointers, String, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Reverse Integer', link: 'https://leetcode.com/problems/reverse-integer', topics: 'Math' },
        { difficulty: 'MEDIUM', title: 'String to Integer (atoi)', link: 'https://leetcode.com/problems/string-to-integer-atoi', topics: 'String' },
        { difficulty: 'EASY', title: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number', topics: 'Math' },
        { difficulty: 'HARD', title: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching', topics: 'String, Dynamic Programming, Recursion' },
        { difficulty: 'MEDIUM', title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water', topics: 'Array, Two Pointers, Greedy' },
        { difficulty: 'EASY', title: 'Roman to Integer', link: 'https://leetcode.com/problems/roman-to-integer', topics: 'Hash Table, Math, String' },
        { difficulty: 'EASY', title: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix', topics: 'String, Trie' },
        { difficulty: 'MEDIUM', title: '3Sum', link: 'https://leetcode.com/problems/3sum', topics: 'Array, Two Pointers, Sorting' },
        { difficulty: 'MEDIUM', title: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', topics: 'Hash Table, String, Backtracking' },
        { difficulty: 'MEDIUM', title: '4Sum', link: 'https://leetcode.com/problems/4sum', topics: 'Array, Two Pointers, Sorting' },
    ],
    'J.P. Morgan': [
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'EASY', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses', topics: 'String, Stack' },
        { difficulty: 'MEDIUM', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals', topics: 'Array, Sorting' },
        { difficulty: 'EASY', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', topics: 'Array, Dynamic Programming' },
        { difficulty: 'MEDIUM', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams', topics: 'Array, Hash Table, String, Sorting' },
        { difficulty: 'MEDIUM', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray', topics: 'Array, Divide and Conquer, Dynamic Programming' },
        { difficulty: 'EASY', title: 'Happy Number', link: 'https://leetcode.com/problems/happy-number', topics: 'Hash Table, Math, Two Pointers' },
        { difficulty: 'MEDIUM', title: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self', topics: 'Array, Prefix Sum' },
        { difficulty: 'MEDIUM', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change', topics: 'Array, Dynamic Programming, Breadth-First Search' },
    ],
    'Jump Trading': [
        { difficulty: 'HARD', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays', topics: 'Array, Binary Search, Divide and Conquer' },
        { difficulty: 'HARD', title: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching', topics: 'String, Dynamic Programming, Recursion' },
        { difficulty: 'HARD', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists', topics: 'Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort' },
        { difficulty: 'HARD', title: 'First Missing Positive', link: 'https://leetcode.com/problems/first-missing-positive', topics: 'Array, Hash Table' },
    ],
    'Juniper Networks': [
        { difficulty: 'MEDIUM', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', topics: 'Hash Table, String, Sliding Window' },
        { difficulty: 'EASY', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum', topics: 'Array, Hash Table' },
        { difficulty: 'MEDIUM', title: 'Reverse Words in a String', link: 'https://leetcode.com/problems/reverse-words-in-a-string', topics: 'Two Pointers, String' },
    ],
}

// Simplified company list for display - keeping your original data
const companies = [
    { name: 'AMD', category: 'Hardware', color: 'from-red-500 to-orange-500', zodiac: '♈', element: 'Fire' },
    { name: 'Airbnb', category: 'Travel', color: 'from-pink-500 to-rose-500', zodiac: '♉', element: 'Earth' },
    { name: 'Amazon', category: 'E-commerce', color: 'from-orange-500 to-yellow-500', zodiac: '♊', element: 'Air' },
    { name: 'Adobe', category: 'Software', color: 'from-red-600 to-red-700', zodiac: '♋', element: 'Water' },
    { name: 'Airtel', category: 'Telecom', color: 'from-red-500 to-pink-500', zodiac: '♌', element: 'Fire' },
    { name: 'American Express', category: 'Finance', color: 'from-blue-600 to-blue-700', zodiac: '♍', element: 'Earth' },
    { name: 'Accenture', category: 'Consulting', color: 'from-purple-600 to-purple-700', zodiac: '♎', element: 'Air' },
    { name: 'Apple', category: 'Technology', color: 'from-gray-600 to-gray-800', zodiac: '♏', element: 'Water' },
    { name: 'Autodesk', category: 'Software', color: 'from-blue-500 to-cyan-500', zodiac: '♐', element: 'Fire' },
    { name: 'BharatPay', category: 'FinTech', color: 'from-indigo-500 to-purple-500', zodiac: '♑', element: 'Earth' },
    { name: 'Bolt', category: 'Mobility', color: 'from-green-500 to-emerald-500', zodiac: '♒', element: 'Air' },
    { name: 'Booking.com', category: 'Travel', color: 'from-blue-600 to-blue-700', zodiac: '♓', element: 'Water' },
    { name: 'Bank of America', category: 'Finance', color: 'from-red-600 to-blue-600', zodiac: '♈', element: 'Fire' },
    { name: 'BlackRock', category: 'Finance', color: 'from-gray-700 to-black', zodiac: '♉', element: 'Earth' },
    { name: 'Box', category: 'Cloud', color: 'from-blue-500 to-blue-600', zodiac: '♊', element: 'Air' },
    { name: 'Cars24', category: 'E-commerce', color: 'from-orange-500 to-red-500', zodiac: '♋', element: 'Water' },
    { name: 'Capital One', category: 'Finance', color: 'from-red-500 to-red-600', zodiac: '♌', element: 'Fire' },
    { name: 'Cloudflare', category: 'Cloud', color: 'from-orange-500 to-orange-600', zodiac: '♍', element: 'Earth' },
    { name: 'Cognizant', category: 'IT Services', color: 'from-blue-600 to-indigo-600', zodiac: '♎', element: 'Air' },
    { name: 'Coinbase', category: 'Crypto', color: 'from-blue-500 to-indigo-600', zodiac: '♏', element: 'Water' },
    { name: 'Credit Karma', category: 'FinTech', color: 'from-green-500 to-teal-500', zodiac: '♐', element: 'Fire' },
    { name: 'Dell', category: 'Hardware', color: 'from-blue-600 to-blue-700', zodiac: '♑', element: 'Earth' },
    { name: 'Duolingo', category: 'EdTech', color: 'from-green-500 to-green-600', zodiac: '♒', element: 'Air' },
    { name: 'Dropbox', category: 'Cloud', color: 'from-blue-500 to-blue-600', zodiac: '♓', element: 'Water' },
    { name: 'Dream11', category: 'Gaming', color: 'from-red-500 to-orange-500', zodiac: '♈', element: 'Fire' },
    { name: 'Flipkart', category: 'E-commerce', color: 'from-blue-500 to-yellow-500', zodiac: '♉', element: 'Earth' },
    { name: 'Fiverr', category: 'Marketplace', color: 'from-green-500 to-green-600', zodiac: '♊', element: 'Air' },
    { name: 'Freshworks', category: 'SaaS', color: 'from-teal-500 to-cyan-500', zodiac: '♋', element: 'Water' },
    { name: 'FreeCharge', category: 'FinTech', color: 'from-blue-500 to-purple-500', zodiac: '♌', element: 'Fire' },
    { name: 'Goldman Sachs', category: 'Finance', color: 'from-blue-700 to-blue-900', zodiac: '♍', element: 'Earth' },
    { name: 'Google', category: 'Technology', color: 'from-blue-500 via-red-500 to-yellow-500', zodiac: '♎', element: 'Air' },
    { name: 'Grammarly', category: 'Software', color: 'from-green-600 to-green-700', zodiac: '♏', element: 'Water' },
    { name: 'Groww', category: 'FinTech', color: 'from-green-500 to-emerald-500', zodiac: '♐', element: 'Fire' },
    { name: 'GoDaddy', category: 'Web Services', color: 'from-green-600 to-green-700', zodiac: '♑', element: 'Earth' },
    { name: 'Grab', category: 'Mobility', color: 'from-green-500 to-green-600', zodiac: '♒', element: 'Air' },
    { name: 'HCL', category: 'IT Services', color: 'from-blue-600 to-blue-700', zodiac: '♓', element: 'Water' },
    { name: 'HP', category: 'Hardware', color: 'from-blue-600 to-cyan-600', zodiac: '♈', element: 'Fire' },
    { name: 'Hotstar', category: 'Entertainment', color: 'from-blue-500 to-indigo-600', zodiac: '♉', element: 'Earth' },
    { name: 'Honeywell', category: 'Industrial', color: 'from-red-600 to-orange-600', zodiac: '♊', element: 'Air' },
    { name: 'Huawei', category: 'Technology', color: 'from-red-600 to-red-700', zodiac: '♋', element: 'Water' },
    { name: 'IBM', category: 'Technology', color: 'from-blue-600 to-blue-800', zodiac: '♌', element: 'Fire' },
    { name: 'IIT Bombay', category: 'Education', color: 'from-blue-700 to-indigo-700', zodiac: '♍', element: 'Earth' },
    { name: 'IMC', category: 'Trading', color: 'from-blue-600 to-purple-600', zodiac: '♎', element: 'Air' },
    { name: 'INDmoney', category: 'FinTech', color: 'from-purple-500 to-pink-500', zodiac: '♏', element: 'Water' },
    { name: 'InMobi', category: 'AdTech', color: 'from-red-500 to-orange-500', zodiac: '♐', element: 'Fire' },
    { name: 'Indeed', category: 'Job Platform', color: 'from-blue-600 to-blue-700', zodiac: '♑', element: 'Earth' },
    { name: 'Info Edge', category: 'Internet', color: 'from-red-500 to-orange-500', zodiac: '♒', element: 'Air' },
    { name: 'Infosys', category: 'IT Services', color: 'from-blue-600 to-blue-700', zodiac: '♓', element: 'Water' },
    { name: 'Intel', category: 'Hardware', color: 'from-blue-600 to-blue-700', zodiac: '♈', element: 'Fire' },
    { name: 'J.P. Morgan', category: 'Finance', color: 'from-blue-700 to-blue-900', zodiac: '♉', element: 'Earth' },
    { name: 'Jump Trading', category: 'Trading', color: 'from-indigo-600 to-purple-600', zodiac: '♊', element: 'Air' },
    { name: 'Juniper Networks', category: 'Networking', color: 'from-green-600 to-teal-600', zodiac: '♋', element: 'Water' },
]

const categories = Array.from(new Set(companies.map(c => c.category))).sort()

export default function InterviewHubPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
    const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL')
    const [stars, setStars] = useState<{ x: number, y: number, size: number, delay: number }[]>([])

    // Generate floating stars
    useEffect(() => {
        const newStars = Array.from({ length: 50 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 5
        }))
        setStars(newStars)
    }, [])

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
            case 'MEDIUM': return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
            case 'HARD': return 'text-rose-400 bg-rose-500/10 border-rose-500/30'
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
        }
    }

    const selectedCompanyData = selectedCompany ? companies.find(c => c.name === selectedCompany) : null
    const questions = selectedCompany ? (companyQuestions as any)[selectedCompany] || [] : []

    const filteredQuestions = difficultyFilter === 'ALL'
        ? questions
        : questions.filter((q: Question) => q.difficulty === difficultyFilter)

    const questionCounts = {
        total: questions.length,
        easy: questions.filter((q: Question) => q.difficulty === 'EASY').length,
        medium: questions.filter((q: Question) => q.difficulty === 'MEDIUM').length,
        hard: questions.filter((q: Question) => q.difficulty === 'HARD').length,
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Cosmic Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black -z-10">
                {/* Animated stars */}
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                            opacity: 0.6,
                        }}
                    />
                ))}

                {/* Nebula effect */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-[120px]" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 relative z-10">
                {/* Mystical Header */}
                <div className="text-center mb-16 relative">
                    {/* Floating crystal ball */}
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                        <Eye className="h-20 w-20 text-purple-300 relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
                        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse">
                            ✨ Destiny Portal ✨
                        </span>
                    </h1>

                    <p className="text-2xl text-purple-200 mb-4 font-serif italic">
                        "The Stars Align to Reveal Your Interview Fate"
                    </p>

                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        🔮 Peer into the mystical realm where ancient wisdom meets modern coding challenges.
                        Each company holds sacred knowledge whispered by the cosmos. Choose your path wisely, young seeker...
                    </p>
                </div>

                {/* Mystical Search Oracle */}
                <div className="mb-16 space-y-8">
                    <div className="relative max-w-4xl mx-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                        <div className="relative transform transition-transform duration-300 group-hover:scale-[1.02]">
                            <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-8 w-8 text-purple-200 animate-pulse" />
                            <input
                                type="text"
                                placeholder="🌟 Summon a company from the cosmic realm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-24 pr-8 py-6 bg-gradient-to-r from-purple-900/90 to-pink-900/90 border-2 border-purple-400/50 rounded-3xl text-white placeholder-purple-200/70 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/30 backdrop-blur-xl text-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Elemental Categories */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 border-2 ${selectedCategory === 'All'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                : 'bg-purple-900/20 border-purple-500/30 text-purple-300 hover:bg-purple-900/40 backdrop-blur-sm'
                                }`}
                        >
                            ⭐ All Destinies ({companies.length})
                        </button>
                        {categories.map(category => {
                            const icon = category === 'Finance' ? '💰' : category === 'Technology' ? '⚡' : category === 'Cloud' ? '☁️' : '🏢'
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 border-2 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                        : 'bg-purple-900/20 border-purple-500/30 text-purple-300 hover:bg-purple-900/40 backdrop-blur-sm'
                                        }`}
                                >
                                    {icon} {category}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Cosmic Counter */}
                <div className="text-center mb-8">
                    <p className="text-purple-200 text-lg font-serif italic">
                        ✨ {filteredCompanies.length} {filteredCompanies.length === 1 ? 'destiny' : 'destinies'} revealed ✨
                    </p>
                </div>

                {/* Tarot Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {filteredCompanies.map((company, index) => {
                        const hasQuestions = (companyQuestions as any)[company.name] && (companyQuestions as any)[company.name].length > 0
                        return (
                            <div
                                key={index}
                                onClick={() => hasQuestions && setSelectedCompany(company.name)}
                                className={`group relative ${hasQuestions ? 'cursor-pointer' : 'opacity-50'}`}
                            >
                                {/* Tarot Card */}
                                <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-blue-900/40 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                                    {/* Mystical border glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-20`} />
                                    </div>

                                    {/* Card content */}
                                    <div className="relative p-6">
                                        {/* Zodiac symbol */}
                                        <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                                            {company.zodiac}
                                        </div>

                                        {/* Company name */}
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                                    {company.category}
                                                </span>
                                                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                                    {company.element}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-4" />

                                        {/* Question count or destiny */}
                                        {hasQuestions ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-purple-200 font-serif italic text-sm">Sacred Trials</span>
                                                    <Sparkles className="h-4 w-4 text-yellow-400" />
                                                </div>
                                                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                                                    {(companyQuestions as any)[company.name].length} Challenges
                                                </p>
                                                <p className="text-xs text-purple-300/70 font-serif italic">
                                                    Click to unveil the mysteries...
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-2">
                                                <p className="text-sm text-gray-400 font-serif italic">
                                                    🌑 The veil has not yet lifted...
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover sparkle effect */}
                                    {hasQuestions && (
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <Sparkles className="absolute top-2 right-2 h-6 w-6 text-yellow-300 animate-pulse" />
                                            <Sparkles className="absolute bottom-2 left-2 h-4 w-4 text-purple-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* No Results - Mystical Message */}
                {filteredCompanies.length === 0 && (
                    <div className="text-center py-20">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-30" />
                            <Eye className="h-24 w-24 text-purple-400 relative z-10 opacity-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-purple-300 mb-3 font-serif">The Cosmos Remains Silent</h3>
                        <p className="text-gray-400 font-serif italic">No destinies match your seeking. Try different celestial coordinates...</p>
                    </div>
                )}
            </div>

            {/* Mystical Question Modal */}
            {
                selectedCompany && selectedCompanyData && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-gradient-to-br from-purple-950/95 via-indigo-950/95 to-black/95 border-2 border-purple-500/50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.5)] my-8">
                            {/* Mystical Header */}
                            <div className={`relative bg-gradient-to-r ${selectedCompanyData.color} p-8 overflow-hidden`}>
                                {/* Animated background */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                                </div>

                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-6xl">{selectedCompanyData.zodiac}</span>
                                            <div>
                                                <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-1">{selectedCompany}</h2>
                                                <p className="text-white/90 text-lg font-serif italic">{selectedCompanyData.category} • {selectedCompanyData.element} Element</p>
                                            </div>
                                        </div>
                                        <p className="text-white/80 font-serif italic text-sm">✨ Enter the realm of sacred knowledge ✨</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCompany(null)}
                                        className="text-white hover:text-purple-200 transition-colors p-2 hover:rotate-90 transform duration-300"
                                    >
                                        <X className="h-10 w-10" />
                                    </button>
                                </div>
                            </div>

                            {/* Cosmic Stats */}
                            <div className="grid grid-cols-4 gap-4 p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                                <div className="text-center">
                                    <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-purple-300">{questionCounts.total}</p>
                                    <p className="text-sm text-purple-200 font-serif">Total Trials</p>
                                </div>
                                <div className="text-center">
                                    <Star className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-emerald-300">{questionCounts.easy}</p>
                                    <p className="text-sm text-emerald-200 font-serif">Beginner</p>
                                </div>
                                <div className="text-center">
                                    <Zap className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-amber-300">{questionCounts.medium}</p>
                                    <p className="text-sm text-amber-200 font-serif">Adept</p>
                                </div>
                                <div className="text-center">
                                    <Sparkles className="h-8 w-8 text-rose-400 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-rose-300">{questionCounts.hard}</p>
                                    <p className="text-sm text-rose-200 font-serif">Master</p>
                                </div>
                            </div>

                            {/* Difficulty Runes */}
                            <div className="flex gap-3 p-6 pb-4 border-b border-purple-500/30">
                                {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((diff) => {
                                    const icons = { ALL: '⭐', EASY: '🌟', MEDIUM: '✨', HARD: '💫' }
                                    return (
                                        <button
                                            key={diff}
                                            onClick={() => setDifficultyFilter(diff)}
                                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all transform hover:scale-105 border-2 ${difficultyFilter === diff
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                                : 'bg-purple-900/20 border-purple-500/30 text-purple-300 hover:bg-purple-900/40'
                                                }`}
                                        >
                                            {icons[diff]} {diff}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Sacred Scrolls (Questions) */}
                            <div className="overflow-y-auto max-h-[50vh] p-6">
                                <div className="space-y-4">
                                    {filteredQuestions.map((question: Question, idx: number) => (
                                        <div
                                            key={idx}
                                            className="group relative bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-5 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all transform hover:-translate-y-1"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 ${getDifficultyColor(question.difficulty)}`}>
                                                            {question.difficulty === 'EASY' ? '🌟 BEGINNER' : question.difficulty === 'MEDIUM' ? '✨ ADEPT' : '💫 MASTER'}
                                                        </span>
                                                        <a
                                                            href={question.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xl font-semibold text-purple-200 hover:text-purple-100 transition-colors flex items-center gap-2 group/link"
                                                        >
                                                            {question.title}
                                                            <ExternalLink className="h-5 w-5 opacity-0 group-hover/link:opacity-100 transition-opacity text-purple-400" />
                                                        </a>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {question.topics.split(', ').map((topic, topicIdx) => (
                                                            <span
                                                                key={topicIdx}
                                                                className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs border border-blue-500/30 font-mono"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredQuestions.length === 0 && (
                                        <div className="text-center py-12">
                                            <Eye className="h-16 w-16 text-purple-400 mx-auto mb-4 opacity-30" />
                                            <p className="text-purple-300 font-serif italic">The stars hide this knowledge for now...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}
