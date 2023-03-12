## SecureRepository Services frontend service
### Introduction
This repository serves as SecureRepository project frontend.
### GitHub-Backup Service features
- Dowell login
- Dowell Client admin
- Register repositories
- Registered repositories reports
- Backup repositories reports
### Technologies to be used
- React , A JavaScript library for building user interfaces .
### logo
[Product Logo](https://uxlivinglab.com/wp-content/uploads/2023/01/Living-Lab-Admin-2.png)
### Tasks Descriptions
#### Task-1
- Build UI as dicussed in the meeting
#### Task-2
- Deploye to github repository
#### Task-3
- Implement login 
    - Login URL : `https://100014.pythonanywhere.com/`
    - Logout URL : `https://100014.pythonanywhere.com/sign-out`
    - Login API : `https://100014.pythonanywhere.com/api/userinfo/`
    - CLient admin : `https://100093.pythonanywhere.com/api/userinfo/`
    - Request Body (for both API) :
            ```
            {
                "session_id":"<user seesion id>"
            }
            ```
#### Task-4 
- Consume the SecureRepository Backend API Services