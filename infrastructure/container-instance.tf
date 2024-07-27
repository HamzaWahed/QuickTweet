resource "azurerm_container_group" "container" ***REMOVED***
  name                = "csci3130project"
  location            = var.location
  resource_group_name = azurerm_resource_group.project.name
  os_type             = "Linux"

  image_registry_credential ***REMOVED***
    server   = "csci3130projectregistry.azurecr.io"
    username = var.acr_username
    password = var.acr_password
  ***REMOVED***

  container ***REMOVED***
    name   = "react-frontend"
    image  = "csci3130projectregistry.azurecr.io/react-frontend:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports ***REMOVED***
      port     = 80
      protocol = "TCP"
***REMOVED***

    environment_variables = ***REMOVED***
      "LOGIN_BACKGROUN_PATH" = "img/background.png"
      "LOGO_PATH"            = "img/fox.png"
      "VITE_API_URL"         = "http://csci3130project.eastus.azurecontainer.io:8080"
***REMOVED***
  ***REMOVED***

  container ***REMOVED***
    name   = "spring-backend"
    image  = "csci3130projectregistry.azurecr.io/spring-backend:latest"
    cpu    = "1.0"
    memory = "2"

    ports ***REMOVED***
      port     = 8080
      protocol = "TCP"
***REMOVED***
  ***REMOVED***

  ip_address_type = "Public"
  dns_name_label  = "csci3130project"
***REMOVED***

output "container_group_fqdn" ***REMOVED***
  value = azurerm_container_group.container.fqdn
***REMOVED***
