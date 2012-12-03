# API documentation


## mii

&lt;p&gt;Major Industry Identifier.&lt;/p&gt;

&lt;p&gt;The first digit of a ISO/IEC 7812 issuer identifier number (inn) tells about&lt;br /&gt;what industry the card is used. The index of the array should be the first&lt;br /&gt;number of the inn.&lt;/p&gt;

## testnumbers

&lt;p&gt;Test numbers from different creditcard schemes. Most of them are taken from&lt;br /&gt;&lt;a href='http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm'&gt;http://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/credit_card_numbers.htm&lt;/a&gt;&lt;/p&gt;

## cardscheme

&lt;p&gt;Find out which major card scheme issued the card based on the iin range.&lt;/p&gt;

## format

&lt;p&gt;Format the credit card number in to the same patterns as seen on the actual&lt;br /&gt;credit cards.&lt;/p&gt;

## validate

&lt;p&gt;Validates the creditcards using the Luhn10 algorithm.&lt;/p&gt;

## expiry

&lt;p&gt;Validates the expiry number.&lt;/p&gt;

## pan

&lt;p&gt;Applies PAN truncation to the given creditcard. PAN (primary account number)&lt;br /&gt;trunction is a &quot;technology&quot; that prevents most of the digits of a creditcard&lt;br /&gt;from appearing on printed receipts.&lt;/p&gt;

## parse

&lt;p&gt;Parse the creditcard information&lt;/p&gt;


