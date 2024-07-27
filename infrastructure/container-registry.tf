resource "azurerm_container_registry" "container_registry" ***REMOVED***
  name                = "csci3130projectregistry"
  resource_group_name = azurerm_resource_group.project.name
  location            = var.location
  admin_enabled       = true
  sku                 = "Basic"
***REMOVED***

output "reigstry_hostname" ***REMOVED***
  value = azurerm_container_registry.container_registry.login_server
***REMOVED***

output "registry_username" ***REMOVED***
  value = azurerm_container_registry.container_registry.admin_username
***REMOVED***
