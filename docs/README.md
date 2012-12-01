

<!-- Start lib/creditcard.js -->

## mii

Major Industry Identifier.

The first digit of a ISO/IEC 7812 issuer identifier number (inn) tells about
what industry the card is used. The index of the array should be the first
number of the inn.

## testnumbers

Test numbers from different creditcard schemes. Most of them are taken from
http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm

## cardscheme(number)

Find out which major card scheme issued the card based on the iin range.

### Params: 

* **String** *number* 

## format(number)

Format the credit card number in to the same patterns as seen on the actual
credit cards.

### Params: 

* **String** *number* 

## validate(number)

Validates the creditcards using the Luhn10 algorithm.

### Params: 

* **String** *number* 

## pan

Applies PAN truncation to the given creditcard. PAN (primary account number)
trunction is a &quot;technology&quot; that prevents most of the digits of a creditcard
from appearing on printed receipts.

### Params: 

* **String** *number* 

### Return:

* **String** pan

## parse(number)

Parse the creditcard information

### Params: 

* **String** *number* 

<!-- End lib/creditcard.js -->

