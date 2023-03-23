<p align="center">
    <img src="https://user-images.githubusercontent.com/97855556/227066235-a2a7d258-d9a3-46ee-b493-977d93a4f0ed.png" height="40">
</p> 

# Noume

Visit at: https://willyamramos.dev/noume

_Technologies Used: React, External APIs, Local Storage, TailwindCSS, HTML_

Noume is a web application with the sole aim of allowing users to find hotel properties for their next trip. It enables users to view all the 
information they need about a hotel such as check-in instructions, reviews from real people, etc. 

## Search Bar

<img src="https://user-images.githubusercontent.com/97855556/227073391-80f72a71-bf18-4503-88dc-f94d1c2a8720.png" width="700">

- The Search Bar component is integrated into the Home page and the Find Noumes page.
- The state within the Search Bar is saved through the useContext hook in order to persist the state throughout all components.

  - State Includes: 
 
       - Destination
       - Check-In/Out Dates
       - Rooms(# of Adults/Children)
       - Price Range
       
 ## Noume Page
 
 <img src="https://user-images.githubusercontent.com/97855556/227097648-683d4e41-73fc-4fb7-bedf-37c77a09b6c0.png" width="700">

- The Noume Page gives users a deeper dive into the Noume they select.
- Here, users are presented with typical must-have knowledge such as the amenities and policies.


Users can also view more photos of the property or reviews.

<p float="left">
 <img src="https://user-images.githubusercontent.com/97855556/227098677-343cd316-38ec-4519-827a-68832904eb8e.png" width="350">
 <img src="https://user-images.githubusercontent.com/97855556/227098688-486e8f76-4cf7-4022-bfab-dd1f8c0a2083.png" width="350">
</p>

## My Noumes Page

 <img src="https://user-images.githubusercontent.com/97855556/227100055-06c2ba47-11ec-490b-ad4a-7e9144b78f9d.png" width="700">
 
 - Each Noume has a heart icon at the top right of its image to allow the user to save the Noume.
 - By saving the Noume, it is put into local storage which allows the web app to persist the saved Noumes into the My Noumes page.
 - The My Noumes page will automatically take these Noumes and put them into a NoumesList if there are saved Noumes.
 - Here, the user can go back to any Noumes they viewed as potential stays for their next trip.



 



