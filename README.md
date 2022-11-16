# Downview

Downview is open-source webmap for hikers, mountainers, treasure hunters and people who love adventures. Area of interest contains only Poland. 
Application use JS with OpenLayers 6.0. Raster and vector data are downloaded from WMS/WMTS services and are directly on server.

To run Downview, you should run localhost e.g. by Python

```
python -m http.server
```

or web service (not always up-to-date)

https://downview.pnytko.pl/

or directly by .html file - not recommended

![alt text](https://pnytko.pl/wp-content/uploads/2022/03/Zrzut-ekranu-2022-03-07-124122.png)

Application have area and lenght measure feature. We can also check coordinates in two datums. A direction can be changed by compass.

#### 20.10.2022 - Cave layer added, fixed some bugs, clear button added, removed MiegMap layer - no copyright

![image](https://user-images.githubusercontent.com/92880201/196902225-b3b630ec-b0ad-48ec-9088-e46c3d6d9b88.png)

#### 21.10.2022 - Cluttering implemented, fixed some bugs, drag and drop function, new layer added - VECTOR

![image](https://user-images.githubusercontent.com/92880201/197182928-bf680e8b-49bf-4bc8-8d40-cff4ab842aad.png)

#### 24.10.2022 -  hands-on drag and drop vector function test!

![image](https://user-images.githubusercontent.com/92880201/197550359-9f69067d-07ee-41ee-ab9b-f4329b626f16.png)

So, I go hiking and used Strava software to track my hike. I export .gpx file from Strava and drag-and-drop that file to Downview. So, everything works perfect putting asside a little distortion of GPS that are **natural**. 

![image](https://user-images.githubusercontent.com/92880201/197579917-3b35f6f7-885e-47c7-ad1e-23589c55a817.png)

**Save to PDF** feature is avaible now but need some optimization

#### 25.10.2022 -  Trails layers added with popup [WIP]

![image](https://user-images.githubusercontent.com/92880201/197759229-1f6b70f2-0096-4d9d-aec3-275fe3d7642a.png)

#### 01.11.2022 -  Completely new pop-up with drag-and-drop function and better design

![image](https://user-images.githubusercontent.com/92880201/199318134-d7f312e8-7d28-4e29-adcc-479af9dd109b.png)

# TODO

- [x] Import GEOJson/KML/GPX by drag-and-drop
- [x] Unify Vector layer and make it as clickable feature
- [x] Cluttering for cave layer
- [x] Export segment as pdf
- [x] Trails layer
- [x] Trails layers popup selection
- [ ] Add cave features on popup in cave layer
- [x] Branch cleanup (create a develop branch)
- [x] PopUp refactoring (dragging feature)
- [ ] Customize your shapes with button

# bugTODO
- [x] Uncheck checkbox "Szlaki" when close_btn (jquery?)
