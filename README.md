## Inventory Manager V2

This is the second iteration of an order processing and management system for a small bakery business (MarthaRaveCookies).

Built using: 
- Next.js
- tailwindcss
- Supabase

## The Story
My aunt runs a small bakery business, and currently does all her operations manually and on paper. She receives orders by email, confirms orders, prices, etc., through multiple correspondences with each customer, taking time away from her actual job: baking.

She also does everything on paper. Compiling a huge spreadsheet of orders (manually inputted of course), she prints the spreadsheet out and checks everything off with pencil. As orders roll in, she needs to print out more and more pages, while doing her best to keep track of delivery dates, weekly inventory and batches. TL;DR: It's a nightmare.

My goal for this project was to make her job as easy as humanly possible, streamlining every single aspect of her business.

My overall aim was to have a platform to accomplish the following tasks: take orders from clients, present the orders to my aunt as cleanly as possible, sorting the orders by week so she knows exactly what she needs to bake and when, send automated emails to customers, calculate total costs and revenue, and finally, present everything to her in a simple, easy-to-use UI, optimizing the UX for a not-so-technically-savvy user.

I believe I have accomplished what I sought out to solve, here are the features of the final product:

## Features
Customer-facing:
- Products page where items can be added to a cart and quantities can be modified
- Checkout page where personal and order details are inputted
- Thank you page, providing helpful info and allowing a new order creation

Business-owner-facing:
- Dashboard displaying a list of products broken down into total dozens and individual items. This list can be sorted by week, so the business owner knows exactly what needs to be baked for that timeframe
- Orders dashboard showing a summary of each order, with relevant information such as: customer name, items in the order, if the order has been verified, if the customer has paid, and if the order has been delivered
- All-orders page where the business owner can look at granular order details and make any edits they see fit to any of the columns
- Finances page where the business owner can record their expenditures, track their predicted spend, actual spend, as well as their profits calculated from each order
- Customers dashboard where the business owner can view all their customers, with the ability to modify their data or reach out to customers through email

