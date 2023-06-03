import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);

  // 初始化钱包 填入私钥
  const wallet = new Wallet("054ad37bef43da05876b2f911c125eda57a55f9b8c95221228473a2618cd6e17");
//785ba85ba57a1196d74bb1e7d51b6b11a4b36c2ea9a569303020a5cdbb3dffc2
//77a7f928f8606ec417a2aadfffa3afa76ee5201898fe7d78326edae5e2f3c21e 测试网
  // 创建deployer
  const deployer = new Deployer(hre, wallet);
  // 设置部署的合约名
  const artifact = await deployer.loadArtifact("Stickman");

  // 计算gas fee
  // 参数为合约中construct的参数
  const greeting = "Hi there!";
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  //部署合约
  
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const greeterContract = await deployer.deploy(artifact, []);

  console.log("constructor args:" + greeterContract.interface.encodeDeploy([]));

  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}