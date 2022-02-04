# filter-recruiters

Archives any email sent to me in gmail from an address previously identified as a recruiter

## Details

Gets a list of N most recent sender email addresses in a gmail label. Scans the inbox for any new emails from the same senders, then applies the label, marks it as read, and archives it. Logs the sender and subject of any email the script archived.

## Prerequisites

Any gmail label containing emails you want filtered. Defaults to running against the `Recruiters` label.

## A note about permissions

I wrote the code, but when you copy paste the code into google scripts, you take full ownership of what the code is doing on your account. Make sure you understand what the code does before you press run. Feel free to report any bugs or make pull requests. I will not assist in recovering any data. This code will never send any data outside the context in which it runs.

## First time setup

1. Go to <script.google.com>
2. Click "New Project"
3. Copy the contents of this repo's [Code.gs](https://raw.githubusercontent.com/chodyo/filter-recruiters/main/main.gs) into your new project's "Code.gs" file
  - If you have a custom label, edit the `const labelName = "Recruiters";` line to contain the name of your label
5. Rename your project to something descriptive, e.g. `Filter Recruiters`
6. Make sure `archiveRecruiters` is the selected function to run
7. Save your changes with `ctrl+s` or `cmd+s`
8. Allow the code to access your inbox
    1. Press the "Run" button at the top to start execution
    2. A popup will appear asking for you to allow the code to access your data, press "Review permissions"
    3. Select the account
    4. Click "Advanced"
    5. Click "Go to {project_name} (unsafe)"
    6. Click "Allow"
9. All emails processed by the script (or any errors that occurred) will appear in the "Execution log" down below

### Running the script automatically

After following the first time setup above, you can run the script on a timer.

1. Click "Triggers" on the far left of the project dashboard (button with the alarm clock icon)
2. Click "Add Trigger"
3. Fill out the form as follows:
  - Function: `archiveRecruiters`
  - Deployment: `Head`
  - Event source: `Time-driven`
  - Type: I use `Hour timer`
  - Interval: `Every hour`
  - Failure notification settings: I recommend `Notify me immediately` so you can stop future execution if you encounter failures.

You can run it more frequently if you want but because the script doesn't yet cache recruiter email addresses, I recommend not running it more frequently than once an hour
