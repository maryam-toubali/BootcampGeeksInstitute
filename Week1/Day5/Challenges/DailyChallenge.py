#ch
# made with AI
import math
class Circle:
    # Constructor: allows creating a Circle with radius or diameter
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must provide either radius or diameter")
    # Property: access diameter like an attribute (encapsulation)
    @property
    def diameter(self):
        return self.radius * 2
    # Property: access area like an attribute, dynamically computed
    @property
    def area(self):
        return math.pi * self.radius ** 2
    # Dunder method: defines how the object is printed (string representation)
    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"
    # Dunder method: allows using + to add two Circle objects (operator overloading)
    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(self.radius + other.radius)
        return NotImplemented
    # Dunder method: allows < comparison based on radius (used for sorting)
    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented
    # Dunder method: allows == comparison based on radius
    def __eq__(self, other):
        if isinstance(other, Circle):
            return self.radius == other.radius
        return NotImplemented

c1 = Circle(radius=5)
c2 = Circle(diameter=10)
c3 = c1 + c2  
print(c1)
print(c2) 
print(c3) 
print(c1 == c2) 
print(c1 < c3)   
circles = [c3, c1, c2]
sorted_circles = sorted(circles)
for c in sorted_circles:
    print(c)

