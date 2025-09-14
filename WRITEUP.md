# DevOps Task Project Write-up

## Tools & Services Used
- **AWS EC2**- For Jenkins Server
- **AWS ECS Fargate** – For running containers without managing servers  
- **AWS ECR** – Docker image storage and registry  
- **AWS VPC & Subnets** – Networking setup for public/private access  
- **Security Groups** – Firewall rules to allow container ports
- **IAM ROLE** – Attcah IAM role for ECS and ECR access policy.
- **Jenkins** – CI/CD pipeline automation  
- **Node.js & Express** – Sample web application  
- **Docker** – Containerization of the app  

## Challenges Faced & How We Solved Them
1. **ECS task not starting**  
   - **Issue:** Incorrect ECR image name and private repository authentication  
   - **Solution:** Corrected the Docker image tagging and ensured proper ECR login  

2. **App not accessible publicly**  
   - **Issue:** Fargate task didn’t have a public IP and Security Group blocked port 3000  
   - **Solution:** Enabled `assignPublicIp=ENABLED` for the task and allowed TCP port 3000 in the security group  

3. **Permission not granted**  
   - **Issue:** ECS and ECR dont have full access.
   - **Solution:** Attached the IAM role with proper access.

## Possible Improvements
- Use **Terraform** or **CloudFormation** to automate infrastructure setup  
- Add **HTTPS** support via an **Application Load Balancer**  
- Include **automated tests** in the Jenkins pipeline  
- Implement **Auto Scaling** for ECS tasks to handle variable load  
