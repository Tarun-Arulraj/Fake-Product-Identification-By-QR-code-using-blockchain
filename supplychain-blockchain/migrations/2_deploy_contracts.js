const ProductRegistry = artifacts.require("ProductRegistry");
const SellerRegistry = artifacts.require("SellerRegistry");
const SalesRegistry = artifacts.require("SalesRegistry");
const ProductSaleRegistry = artifacts.require("ProductSaleRegistry");

module.exports = async function (deployer) {
  // Deploy ProductRegistry first
  await deployer.deploy(ProductRegistry);
  const productRegistry = await ProductRegistry.deployed();

  // Pass ProductRegistry address to SellerRegistry constructor
  await deployer.deploy(SellerRegistry, productRegistry.address);

  // Deploy SalesRegistry and ProductSaleRegistry (assuming they don't need parameters)
  await deployer.deploy(SalesRegistry);
  await deployer.deploy(ProductSaleRegistry);
};
