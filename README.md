## Trabajo Práctico Arquitectura Web

---

#### Nombre de Grupo 
Nat&Javo

<br>

#### Integrantes
- Natalia Bellosi
- Javier Escandarani

<br>

#### Descripción del negocio
Sistema de gestión de ventas para negocios que trabajan con comisiones en el cuál se podrán cargar vendedores, productos y ventas y luego se calcularán automáticamente las comisiones.

Principales funciones:
- Crear, eliminar y modificar vendedores
- Crear, eliminar y modificar productos
- Crear, eliminar y modificar ventas
- Obtener comisiones de un vendedor 
- Reportes mensuales de comisiones

<br>

#### Endpoints
|Método|Endpoint|Body|Status|
|---|---|---|---|
|GET|/users|N/A|Done
|GET|/users/:id|N/A|Done
|POST|/users|{ email, firstName, lastName, document, role }|
|PUT|/users|{ id, email, firstName, lastName, document, role }|
|DELETE|/users/:id|N/A|
|GET|/sales/:id|N/A|
|GET|/sales/user/:id?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|GET|/sales/product/:id?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|GET|/sales?from_date="2020-09-09"&to_date="2020-09-09"|N/A|
|POST|/sales|{ products: [{ id, price }], userId, date, totalPrice }|
|PUT|/sales|{ id, products: [{ id, price }], userId, date, totalPrice }|
|DELETE|/sales/:id|N/A|
|GET|/products/:id|N/A|
|POST|/products|{ name, description, price }|
|PUT|/products|{ id, name, description, price }|
|DELETE|/products/:id|N/A|
|GET|/sales/user/:id/comissions?from_date="2020-09-09"&to_date="2020-09-09"|N/A|