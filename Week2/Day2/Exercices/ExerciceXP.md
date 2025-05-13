
### 📘 **dvdrental Database Schema Overview**

#### 1. **actor**

* **Purpose**: Stores information about actors.
* **Columns**:

  * `actor_id` (PK): Unique identifier for each actor.
  * `first_name`: Actor's first name.
  * `last_name`: Actor's last name.
  * `last_update`: Timestamp of the last update.

#### 2. **film**

* **Purpose**: Contains details about films.
* **Columns**:

  * `film_id` (PK): Unique identifier for each film.
  * `title`: Title of the film.
  * `description`: Brief description.
  * `release_year`: Year of release.
  * `language_id` (FK): References `language.language_id`.
  * `rental_duration`: Duration for which the film can be rented.
  * `rental_rate`: Cost to rent the film.
  * `length`: Duration of the film.
  * `replacement_cost`: Cost to replace the film.
  * `rating`: Film rating (e.g., PG, R).
  * `last_update`: Timestamp of the last update.
  * `special_features`: Special features included.
  * `fulltext`: Text search data.

#### 3. **film\_actor**

* **Purpose**: Associates films with their actors (many-to-many relationship).
* **Columns**:

  * `actor_id` (PK, FK): References `actor.actor_id`.
  * `film_id` (PK, FK): References `film.film_id`.
  * `last_update`: Timestamp of the last update.

#### 4. **category**

* **Purpose**: Lists film categories.
* **Columns**:

  * `category_id` (PK): Unique identifier for each category.
  * `name`: Name of the category.
  * `last_update`: Timestamp of the last update.

#### 5. **film\_category**

* **Purpose**: Associates films with categories (many-to-many relationship).
* **Columns**:

  * `film_id` (PK, FK): References `film.film_id`.
  * `category_id` (PK, FK): References `category.category_id`.
  * `last_update`: Timestamp of the last update.

#### 6. **language**

* **Purpose**: Lists languages available for films.
* **Columns**:

  * `language_id` (PK): Unique identifier for each language.
  * `name`: Name of the language.
  * `last_update`: Timestamp of the last update.

#### 7. **inventory**

* **Purpose**: Tracks inventory items available in stores.
* **Columns**:

  * `inventory_id` (PK): Unique identifier for each inventory item.
  * `film_id` (FK): References `film.film_id`.
  * `store_id` (FK): References `store.store_id`.
  * `last_update`: Timestamp of the last update.

#### 8. **rental**

* **Purpose**: Records rental transactions.
* **Columns**:

  * `rental_id` (PK): Unique identifier for each rental.
  * `rental_date`: Date and time of rental.
  * `inventory_id` (FK): References `inventory.inventory_id`.
  * `customer_id` (FK): References `customer.customer_id`.
  * `return_date`: Date and time of return.
  * `staff_id` (FK): References `staff.staff_id`.
  * `last_update`: Timestamp of the last update.

#### 9. **payment**

* **Purpose**: Records payment transactions.
* **Columns**:

  * `payment_id` (PK): Unique identifier for each payment.
  * `customer_id` (FK): References `customer.customer_id`.
  * `staff_id` (FK): References `staff.staff_id`.
  * `rental_id` (FK): References `rental.rental_id`.
  * `amount`: Payment amount.
  * `payment_date`: Date and time of payment.

#### 10. **staff**

* **Purpose**: Contains staff member information.
* **Columns**:

  * `staff_id` (PK): Unique identifier for each staff member.
  * `first_name`: Staff member's first name.
  * `last_name`: Staff member's last name.
  * `address_id` (FK): References `address.address_id`.
  * `email`: Staff member's email.
  * `store_id` (FK): References `store.store_id`.
  * `active`: Indicates if the staff member is active.
  * `username`: Login username.
  * `password`: Login password.
  * `last_update`: Timestamp of the last update.
  * `picture`: Staff member's picture.

#### 11. **customer**

* **Purpose**: Stores customer information.
* **Columns**:

  * `customer_id` (PK): Unique identifier for each customer.
  * `store_id` (FK): References `store.store_id`.
  * `first_name`: Customer's first name.
  * `last_name`: Customer's last name.
  * `email`: Customer's email.
  * `address_id` (FK): References `address.address_id`.
  * `activebool`: Indicates if the customer is active (boolean).
  * `create_date`: Date the customer was added.
  * `last_update`: Timestamp of the last update.
  * `active`: Indicates if the customer is active.

#### 12. **address**

* **Purpose**: Contains address details.
* **Columns**:

  * `address_id` (PK): Unique identifier for each address.
  * `address`: Primary address line.
  * `address2`: Secondary address line.
  * `district`: District or region.
  * `city_id` (FK): References `city.city_id`.
  * `postal_code`: Postal code.
  * `phone`: Contact phone number.
  * `last_update`: Timestamp of the last update.

#### 13. **city**

* **Purpose**: Lists cities.
* **Columns**:

  * `city_id` (PK): Unique identifier for each city.
  * `city`: Name of the city.
  * `country_id` (FK): References `country.country_id`.
  * `last_update`: Timestamp of the last update.

#### 14. **country**

* **Purpose**: Lists countries.
* **Columns**:

  * `country_id` (PK): Unique identifier for each country.
  * `country`: Name of the country.
  * `last_update`: Timestamp of the last update.

#### 15. **store**

* **Purpose**: Contains store information.
* **Columns**:

  * `store_id` (PK): Unique identifier for each store.
  * `manager_staff_id` (FK): References `staff.staff_id`.
  * `address_id` (FK): References `address.address_id`.
  * `last_update`: Timestamp of the last update.

---

### 🔗 **Understanding the Relationships**

* **One-to-Many**:

  * A **country** can have many **cities**.
  * A **city** can have many **addresses**.
  * An **address** can be associated with many **customers** and **staff**.
  * A **store** can have many **staff** and **customers**.
  * A **film** can have many **inventory** items.

* **Many-to-Many**:

  * **films** and **actors**: Connected via the `film_actor` table.
  * **films** and **categories**: Connected via the `film_category` table.

* **One-to-One**:

  * Each **store** has one **manager\_staff\_id**, linking to a staff member.

---
