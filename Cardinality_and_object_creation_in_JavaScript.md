# Cardinality and object creation strategies in JavaScript

TL;DR: Use literal object notation for ad-hoc, all public objects. Use a factory function for singleton objects that need private state. Use prototypical inheritance for model objects or types that will need lots of instances.

When you need a new object in JavaScript you can choose from many options. In this article, I'll try to make sense of all this and I'll propose criteria to choose one option.

But first, what can we do to create new objects in JavaScript:

## Use the ```Object``` type constructor

JavaScript has an ```Object``` type and you can create new instances of this type using its constructor function like so:

```const myCar = new Object();```

Then you can add properties to ```myCar``` like so:

```
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;
```

More info on this [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties) and [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

You You can do amazing things like:

```
const something = new Object(33);
something.value = 44;

something ==  33  // this is true
something === 333 // this is false
```

I'm kidding. Please, don't do that.

So the ```Object``` constructor function can receive a value and objects can have properties. This is too difficult! let's see other options...

## Use literal object notation

Also called __initializer__ notation. You can write new objects like this: 

```
const myCar = {
	make: "Ford",
	model: "Mustang",
	year: 1969
};
```

This will get you an instance just like the one in the previous example that used the Object type's constructor function. Just like that, easy peasy lemon squeezy.

The downside of this (and previous) mechanisms is that you have to manually define all the properties of your objects each time they're created. You don't get to inherit properties from a common object and that can be a burden especially when you're trying to add methods to your objects.

There are other alternatives...

## Use ```Object.create``` function

This is really complex and you should know about prototypical inheritance to use this function. Let's say that you have some object that holds a prototype you want to use to assing to new objects:

```
const birthdayPrototype = {
	isToday() {
		const today = new Date();
		return this.date.getYear() == today.getYear() 
		    && this.date.getMonth() == today.getMonth() 
		    && this.date.getDate() == today.getDate();
	}
}
```

Then you can obtain new objects that will have this prototype like so:

```
const johnsBirthday = Object.create(prototype);

johnsBirthday.date = new Date();
johnsBirthday.isToday() // this is true

johnsBirthday.date = new Date(2016,1,1);
johnsBirthday.isToday() // this is false
```
