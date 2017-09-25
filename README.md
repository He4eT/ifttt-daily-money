# ifttt-daily-money

Simple web-service, that calculate amount of money, that you can spend every day considering your payday.

## Usage:

`https://ifttt-daily-money.herokuapp.com/calculate/{ifttt_key}/{day_of_month}/{current_balance}`

Params:
- `ifttt_key` -- key from your IFTTT Webhook applet
- `day_of_month` -- your payday
- `current_balance` -- current amount of your free money

This request trigger the `pocketMoney` event on IFTTT with `value1` param. 

## Step-by-step
- [English version](https://he4et.github.io/ifttt-daily-money/)
- [Русская версия](https://he4et.github.io/ifttt-daily-money/step-by-step.ru.html)
