# DeleteFolder

### Description
    Deletes a folder from a parent folder.

### Authors
| Name          | Email             | Contact           |
|:--------------|:------------------|:------------------|
| Ankit Mishra  | ankit.mishra@robofi.com| +919713490290|

### Version
    1.0.0

### Category
    FOLDER

### Inputs
| Name          | Type          | Default Value      | Description                  |
|:--------------|:--------------|:-------------------|:-----------------------------|
| parentFolderPath  | string | None | Parent Folder path from where a folder has to be deleted |
| folderToBeDeleted  | string | None | Name of folder to be deleted |

### Outputs
| Name          | Type          | Description                  |
|:--------------|:--------------|:-----------------------------|
| deletionStatus  | boolean | Status if the file is deleted or not |

### Errors
| Message       | Code          | Description                  |
|:--------------|:--------------|:-----------------------------|
| FOLDER_NOT_FOUND| 1000000001  | Folder not found             |

#### Dependencies
|Dependency        |Type        |Description                                   |
|:-----------------|:-----------|:---------------------------------------------|
| os		 	   | module     | For interaction with System directories      |