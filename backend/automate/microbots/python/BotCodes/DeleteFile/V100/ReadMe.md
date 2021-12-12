# DeleteFile

### Description
    Deletes a file from a given folder.

### Authors
| Name          | Email             | Contact           |
|:--------------|:------------------|:------------------|
| Ankit Mishra  | ankit.mishra@robofi.com| +919713490290|

### Version
    1.0.0

### Category
    FILE

### Inputs
| Name          | Type          | Default Value      | Description                  |
|:--------------|:--------------|:-------------------|:-----------------------------|
| folderPath  | string | None | Folder path from where a file has to be deleted |
| fileName  | string | None | Name of file to be deleted |

### Outputs
| Name          | Type          | Description                  |
|:--------------|:--------------|:-----------------------------|
| deletionStatus  | boolean | Status if the file is deleted or not |

### Errors
| Message       | Code          | Description                  |
|:--------------|:--------------|:-----------------------------|
| FILE_NOT_FOUND| 1000000000    | File not found               |
| FOLDER_NOT_FOUND| 1000000001  | Folder not found             |

#### Dependencies
|Dependency        |Type        |Description                                   |
|:-----------------|:-----------|:---------------------------------------------|
| os		 	   | module     | For interaction with System directories      |