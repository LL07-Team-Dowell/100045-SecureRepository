## SecureRepository Services

### Introduction
This backend service serves as the SecureRepository product Backend.
### SecureRepository Service features
- Register repositories
- Registered repositories reports
- Backup repositories reports
### API Endpoints 
- Base URL : `http://100045.pythonanywhere.com/`

| HTTP Verbs | Endpoints                      | Action                                               |
|------------|--------------------------------|------------------------------------------------------|
| POST       | /backup/repositoryClone/              | To resgister the repository              |
| GET       | /get-respository-reports/:company_id/ | To get reports for registered repository                           |
| GET        | /get-backup-reports/:company_id/  | To get the reports for backup                       |

### Endpoints Definition(Request - Response).
#### Register repositories

_POST_ to `/backup/repositoryClone/`

Request Body 
```json
{
    "repository_name": "<repository_name>",
    "repository_url" :"<repository_url>",
    "org_name" : "<organisation from login>",
    "company_id" : "<company id from login>",
    "data_type" : "<data type from login>" ,
    "created_by" : "<created by from login>"
}
```
Response-200
```json
{
    "status":"<{repository_name} has been clonned .>",
    "webhook_link":"<https://100045.pythonanywhere.com/backup/{company_id}/{repository_name}/>"
}
```
Response-400
```json
{
    "info": "Something went wrong!!"
}
```
#### Registered repositories reports
_GET_ `/get-respository-reports/:company_id/`

Response-200
```json
{
    "isSuccess": true,
    "data": [
        {
            "function_number": "<function number>",
            "repository_name": "<repository_name>",
            "repository_url" :"<repository_url>",
            "org_name" : "<organisation from login>",
            "company_id" : "<company id from login>",
            "data_type" : "<data type from login>" ,
            "created_by" : "<created by from login>",
            "date_of_registration": "<date>",
            "time_of_registration": "<time>",
            "webhook_link":"<https://100045.pythonanywhere.com/backup/{company_id}/{repository_name}/>"
        }
    ]
}
```
Response-400
```json
{
    "info": "Something went wrong!!"
}
```

#### Backup repositories reports

_GET_ `/get-backup-reports/:company_id/`

Response-200
```json
{
    "isSuccess": true,
    "data": [
        {
            "company_id": "<company_id>",
            "function_number": "<function number>",
            "zip_file_name": "<{repository name} {eventID}.zip>",
            "backup_date": "<date>",
            "backup_time": "<time>"
        }
    ]
}
```
Response-400
```json
{
    "info": "Something went wrong!!"
}
```
### Technologies Used

- Python is a programming language that lets you work more quickly and integrate your systems more effectively.
- Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.
- Django Rest Framework Django REST framework is a powerful and flexible toolkit for building Web APIs.
- MongoDB is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

### License
This project is available for use under [License](https://github.com/LL07-Team-Dowell/100045-githubbackup-frontend/blob/main/LICENSE).


