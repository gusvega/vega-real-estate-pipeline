provider "azurerm" {
  features {}
}

resource "azurerm_kubernetes_cluster" "production" {
  name                = "real-estate-cluster"
  location            = "westus"
  resource_group_name = "vega_real_estate"
  dns_prefix          = "real-estate-cluster"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }

  tags = {
    Environment = "dev"
  }
}
