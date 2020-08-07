# Newton's laws of motion

A *force* is a *vector* that causes an object with *mass* to *accelerate*.

### Newton's First Law

Newton's first law is commonly stated as:

> An object at rest stays at rest 
> and an object in motion stays in motion.

However, this is missing an important element related to forces.
We could expand it by stating:

> An object at rest stays at rest 
> and an object in motion stays in motion at a constant speed and direction 
> unless acted upon by an unbalanced force.

By the time Newton came along, 
the prevailing theory of motion - formulated by Aristotle - 
was nearly two thousand years old.
It stated that if an object is moving, some sort of force is required to keep it moving.
Unless that moving thing is being pushed or pulled,
it will simply slow down or stop.

This, of course, is not true.
In the absence of any force, no force is required to keep an object moving.
An object (such as a ball) tossed in the earth's atmosphere slows down because of air resistance (a force).
An object's velocity will only remain constant in the absence of any forces 
or if the forces that act on it cancel each other out, i.e. the net force adds up to zero.
This is often referred to as equilibrium.
The falling ball will reach a terminal velocity (that stays constant)
once the force of air resistance equals the force of gravity.

### Newton's Third Law

This law is often stated as:

For every action there is an equal and opposite reaction.

This law frequently causes some confusion in the way that it is stated.
For one, it sounds like one force causes another.
Yes, if you push someone, that someone may actively decide to push you back.
But this is not the action and reaction we are talking about with Newton's third law.

Let's say you push against a wall.
The wall doesn't actively decide to push back on you.
There is no 'origin' force.
Your push simply includes both forces, referred to as an 'action/reaction pair'.

A better way of stating the law might be:

Forces always occur in pairs.
The two forces are of equal strength, but in opposite directions.

Now, this still causes confusion because it sounds like these forces would always cancel each other out.
This is not the case. Remember, the forces act on different objects.
And just because the two forces are equal,
it doesn't mean that the movements are equal (or that the objects will stop moving).

Try pushing on a stationary truck.
Although the truck is far more powerful than you,
unlike a moving one, a stationary truck will never overpower you
and send you flying backwards.
The force you exert on it is equal and opposite to the force exerted on your hands.
The outcome depends on a variety of other factors.
If the truck is a small truck on an icy downhill,
you'll probably be able to get it to move.
On the other hand,
if it's a very large truck on a dirt road and you push hard enough, 
you could injure your hand.

Let's re-state Newton's third law for our world:

if we calculate a vector f that is force of object A on object B, 
we must also apply the force - vector; that B exerts on object A.

### Newton's Second Law

And here we are at the most important law for the programmer.

This law is traditionally stated as:

Force equals mass times acceleration. => F = MA

Why is this the most important law for us? Well, let's write it a different way.

A = F / M

Acceleration is directly proportional to force and inversely proportional to mass.
This means that if you get pushed, the harder you are pushed, the faster you'll move (accelerate).
The bigger you are, the slower you'll move.

### Weight vs. Mass

The mass of an object is a measure of the amount of matter in the object (measured in kilograms).
Weight, though often mistaken for mass, is technically the force of gravity on an object.
From Newton's second law, we can calculate it as mass times the acceleration of gravity (w = m * g).
Weight is measured in newtons.

Density is defined as the amount of mass per unit of volume (grams per cubic centimeter, for example).

Note that an object that has a mass of one kilogram on earth would have a mass of one kilogram on the moon.
However, it would weigh only one-sixth as much.

Now, in the world, what is mass anywhere? Aren't we dealing with pixels?
To start in a simple place, let's say that in our pretend pixel world, 
all of our objects have a mass equal to 1.
F / 1 = F. And so: A = F

The acceleration of an object is equal to force. This is great news.
After all, we saw in the Vectors section that acceleration 
was the key to controlling the movement of our objects on screen.
Acceleration was where it all began.
Now we learn that force is truly where it all begins.

Let's use what we've learn to build on our object, 
which currently has position, velocity, and acceleration.
Now our goal is to be able to add forces to this object, perhaps saying:

```js
mover.applyForce(wind)
```

or 

```js
mover.applyForce(gravity)
```

where wind and gravity are vectors.
According to newton's second law, we could implement this function as follows:

```js
function applyForce(force) {
    mover.acceleration = force
}
```

### Force Accumulation

This looks pretty good.
After all, acceleration = force is a literal translation of Newton's second law (without mass).
Nevertheless, there's a pretty big problem here.
Let's return to what we are trying to accomplish: 
creating a moving object on the screen that responds to wind and gravity.

```js
mover.applyForce(wind)
mover.applyForce(gravity)
mover.update()
mover.display()
```


