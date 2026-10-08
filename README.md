# Student Task Manager – DevOps Project

A production-style DevOps implementation of a **Student Task Manager** application using Docker, Jenkins, Kubernetes, Argo CD, Prometheus, and Grafana.

The project demonstrates an end-to-end **CI/CD + containerization + Kubernetes deployment + GitOps + monitoring** workflow.

---

## 🚀 Project Overview

The Student Task Manager is a simple web application that allows users to manage student tasks.

The main purpose of this project is to implement a complete DevOps lifecycle:

```text
Developer
   ↓
GitHub
   ↓
Jenkins CI/CD
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Kubernetes
   ↓
Argo CD
   ↓
Prometheus
   ↓
Grafana

The application consists of:
- React/Vite frontend
- Node.js/Express backend
- Docker containers
- Kubernetes deployments and services
- Jenkins CI/CD pipeline
- Argo CD GitOps deployment
- Prometheus monitoring
- Grafana dashboard

🏗️ Architecture

                        ┌──────────────────┐
                        │     Developer    │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │     GitHub       │
                        │  Source Control  │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │     Jenkins      │
                        │     CI/CD        │
                        └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐      ┌──────────────────┐
          │ Backend Docker   │      │ Frontend Docker  │
          │     Image        │      │      Image       │
          └────────┬─────────┘      └────────┬─────────┘
                   │                         │
                   └────────────┬────────────┘
                                ▼
                       ┌──────────────────┐
                       │    Docker Hub    │
                       └────────┬─────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │    Kubernetes    │
                       │   cka-cluster1   │
                       └────────┬─────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
      ┌──────────────────┐              ┌──────────────────┐
      │     Frontend     │              │     Backend      │
      │    Deployment    │              │    Deployment    │
      │    1 Replica     │              │    2 Replicas    │
      └────────┬─────────┘              └────────┬─────────┘
               │                                 │
               ▼                                 ▼
      ┌──────────────────┐              ┌──────────────────┐
      │ Frontend Service │              │ Backend Service  │
      │     NodePort     │              │    ClusterIP     │
      │     :30080       │              │      :5000       │
      └──────────────────┘              └────────┬─────────┘
                                                  │
                                                  ▼
                                         ┌──────────────────┐
                                         │    Prometheus    │
                                         │    Monitoring    │
                                         └────────┬─────────┘
                                                  │
                                                  ▼
                                         ┌──────────────────┐
                                         │     Grafana      │
                                         │    Dashboard     │
                                         └──────────────────┘


🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code management |
| Jenkins | CI/CD automation |
| Docker | Containerization |
| Docker Hub | Container image registry |
| Kubernetes | Container orchestration |
| Kind | Local Kubernetes cluster |
| Argo CD | GitOps continuous delivery |
| Prometheus | Metrics collection |
| Grafana | Monitoring and visualization |
| Node.js | Backend |
| Express.js | Backend API |
| React | Frontend |
| Vite | Frontend build tool |
| Nginx | Frontend web server and reverse proxy |
| YAML | Kubernetes configuration |


📁 Project Structure

Devops-project1/
│
├── Jenkinsfile
├── README.md
│
├── argocd/
│   └── application.yaml
│
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── server.js
│
├── frontend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   └── vite.config.js
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── kustomization.yaml
│   ├── namespace.yaml
│   └── servicemonitor.yaml
│
└── monitoring/
    └── grafana-dashboard.json

💻 Application
Frontend
The frontend is built using:
- React
- Vite
- Nginx
The frontend communicates with the backend through:
/api

Nginx is configured to proxy API requests to:
http://backend-service:5000

Backend
The backend is built using:
- Node.js
- Express.js
- prom-client
Backend port:
5000

API Endpoints
Endpoint	Purpose
/api/health	Health check
/api/tasks	Task management API
/api/info	Application information
/metrics	Prometheus metrics


🐳 Docker
Two Docker images are created for the application.
Backend Image
shubham336/student-task-backend:latest

Frontend Image
shubham336/student-task-frontend:latest

The images are built automatically by Jenkins and pushed to Docker Hub.
🔄 Jenkins CI/CD Pipeline
The Jenkins pipeline is defined in:
Jenkinsfile

The pipeline performs the following stages:
Checkout
   ↓
Build Backend Image
   ↓
Build Frontend Image
   ↓
Push Docker Images
   ↓
Deploy to Kubernetes
   ↓
Verify Deployment

Jenkins Pipeline Stages
1. Checkout
Jenkins checks out the latest source code from GitHub.
GitHub → Jenkins

2. Build Backend Image
Jenkins builds the backend Docker image:
docker build -t shubham336/student-task-backend:latest ./backend

3. Build Frontend Image
Jenkins builds the frontend Docker image:
docker build -t shubham336/student-task-frontend:latest ./frontend

4. Push Docker Images
Jenkins authenticates with Docker Hub and pushes both images.
Backend Image → Docker Hub
Frontend Image → Docker Hub

Docker Hub credentials are stored securely inside Jenkins Credentials.
5. Deploy to Kubernetes
Jenkins deploys the Kubernetes manifests using:
kubectl apply -k k8s/

Kustomize is used to manage the Kubernetes resources.
6. Verify Deployment
Jenkins waits for both deployments to successfully roll out:
kubectl rollout status deployment/backend -n student-app
kubectl rollout status deployment/frontend -n student-app

This ensures the pipeline doesn't report success until the application is successfully deployed.
☸️ Kubernetes
The application is deployed into the Kubernetes namespace:
student-app

Kubernetes Resources
Namespace
student-app

Backend Deployment
backend

Backend replicas:
2

Frontend Deployment
frontend

Frontend replicas:
1

🌐 Kubernetes Services
Backend Service
The backend uses a ClusterIP service:
backend-service

Port:
5000

The backend service is accessible internally inside the Kubernetes cluster.
Frontend Service
The frontend uses a NodePort service:
frontend-service

NodePort:
30080

The application can therefore be accessed locally using:
http://localhost:30080

🔍 Health Checks
The backend deployment uses Kubernetes health probes.
Health endpoint:
/api/health

Kubernetes uses the endpoint to determine whether the backend container is healthy and ready to receive traffic.
🌱 GitOps with Argo CD
Argo CD is used to implement GitOps-based continuous delivery.
Argo CD watches the Kubernetes manifests stored in the GitHub repository.
Application manifest:
argocd/application.yaml

Argo CD tracks:
GitHub Repository
      ↓
      k8s/
      ↓
Argo CD
      ↓
Kubernetes

Argo CD Application
Application name:
student-task-app

Git repository:
https://github.com/shubham-chitalkar/Devops-project.git

Kubernetes path:
k8s

Target branch:
main

Argo CD is configured with:
Automated Sync
Prune
Self Heal

📊 Monitoring
Monitoring is implemented using:
Prometheus + Grafana

Prometheus
Prometheus collects application and Kubernetes metrics.
The backend exposes metrics through:
/metrics

The backend uses the prom-client package to expose Prometheus-compatible metrics.
Custom Application Metric
The application exposes:
student_task_http_requests_total

This metric tracks HTTP requests using labels such as:
method
route
status_code

Example:
student_task_http_requests_total

📡 ServiceMonitor
A Prometheus ServiceMonitor is used to discover the backend metrics endpoint.
File:
k8s/servicemonitor.yaml

Prometheus scrapes:
/metrics

from the backend service.
Scrape interval:
15 seconds

📈 Grafana
Grafana is used to visualize the application metrics collected by Prometheus.
Dashboard:
Student Task Manager

The dashboard includes:
HTTP Requests Per Second
rate(student_task_http_requests_total[1m])

Total HTTP Requests
sum(student_task_http_requests_total)

Backend Pods
count(up{job="backend-service"})

The dashboard refreshes automatically every:
10 seconds

🔐 Security
The following practices are used:
- Docker Hub credentials are stored in Jenkins Credentials.
- Docker Hub authentication uses a Personal Access Token.
- Secrets are not hardcoded inside the Jenkinsfile.
- Kubernetes services are separated using ClusterIP and NodePort.
- Backend is not directly exposed outside the cluster.
- Kubernetes health checks are configured for the backend.
🔧 Local Setup
Prerequisites
Install the following:
- Docker Desktop
- Git
- kubectl
- Kind
- Helm
- Jenkins
- Kubernetes cluster
🚀 Run Kubernetes Cluster
Create the Kind cluster:
kind create cluster --name cka-cluster1 --config kind-cka-cluster1-config.yaml

Verify:
kubectl get nodes

Expected:
cka-cluster1-control-plane   Ready

📦 Deploy Application
Apply the Kubernetes manifests:
kubectl apply -k k8s/

Check resources:
kubectl get pods -n student-app

Check services:
kubectl get svc -n student-app

🌐 Access Application
The frontend is exposed through NodePort 30080.
Open:
http://localhost:30080

🔄 Jenkins Setup
Create a Jenkins Pipeline job.
Configure:
Pipeline → Pipeline script from SCM

Repository:
https://github.com/shubham-chitalkar/Devops-project.git

Branch:
*/main

Jenkinsfile:
Jenkinsfile

Add Docker Hub credentials to Jenkins with credential ID:
dockerhub

Then run:
Build Now

🐳 Docker Commands
Build backend:
docker build -t shubham336/student-task-backend:latest ./backend

Build frontend:
docker build -t shubham336/student-task-frontend:latest ./frontend

Run backend locally:
docker run -p 5000:5000 shubham336/student-task-backend:latest

☸️ Useful Kubernetes Commands
Check nodes:
kubectl get nodes

Check pods:
kubectl get pods -n student-app

Check services:
kubectl get svc -n student-app

Check deployments:
kubectl get deployments -n student-app

Check backend logs:
kubectl logs deployment/backend -n student-app

Check frontend logs:
kubectl logs deployment/frontend -n student-app

Check rollout:
kubectl rollout status deployment/backend -n student-app

kubectl rollout status deployment/frontend -n student-app

🔎 Useful Monitoring Commands
Check monitoring namespace:
kubectl get pods -n monitoring

Port-forward Grafana:
kubectl port-forward svc/kube-prom-stack-grafana 3000:80 -n monitoring

Open:
http://localhost:3000

Port-forward Prometheus:
kubectl port-forward svc/kube-prom-stack-kube-prome-prometheus 9090:9090 -n monitoring

Open:
http://localhost:9090

🔄 Argo CD Access
Port-forward Argo CD:
kubectl port-forward svc/argocd-server 8082:443 -n argocd

Open:
https://localhost:8082

Argo CD application:
student-task-app

Expected status:
Synced
Healthy

🧪 Project Testing
The project was tested end-to-end.
Application Testing
- Frontend application loads successfully.
- Student tasks can be added.
- Backend APIs respond successfully.
- Kubernetes services route traffic correctly.
Docker Testing
- Backend image builds successfully.
- Frontend image builds successfully.
- Images are pushed successfully to Docker Hub.
Jenkins Testing
Jenkins pipeline successfully completed:
Checkout                    ✅
Backend Docker Build        ✅
Frontend Docker Build       ✅
Docker Hub Push             ✅
Kubernetes Deployment       ✅
Deployment Verification     ✅

Final successful pipeline:
Jenkins Build #9

Kubernetes Testing
- Backend pods running.
- Frontend pod running.
- Backend health checks working.
- Frontend accessible through NodePort.
Argo CD Testing
Application: student-task-app
Status: Synced
Health: Healthy

Prometheus Testing
Backend metrics were successfully discovered and scraped by Prometheus.
Grafana Testing
Grafana successfully queried Prometheus and displayed application metrics.
📌 Key DevOps Concepts Demonstrated
This project demonstrates practical knowledge of:
- Git version control
- GitHub
- CI/CD
- Jenkins pipelines
- Docker
- Docker Hub
- Container image management
- Kubernetes
- Deployments
- Services
- Namespaces
- ConfigMap-style Kubernetes management through manifests
- Health probes
- Kustomize
- GitOps
- Argo CD
- Automated synchronization
- Self-healing
- Prometheus
- ServiceMonitor
- Application metrics
- Grafana dashboards
- Kubernetes troubleshooting
- CI/CD troubleshooting
🧠 What I Learned
Through this project, I learned how different DevOps tools work together as one complete delivery system.
The major workflow is:
Code
 ↓
GitHub
 ↓
Jenkins
 ↓
Docker
 ↓
Docker Hub
 ↓
Kubernetes
 ↓
Argo CD
 ↓
Prometheus
 ↓
Grafana

I also gained hands-on experience troubleshooting:
- Docker container issues
- Jenkins configuration
- Kubernetes connectivity
- Kubernetes services
- Kind cluster configuration
- Argo CD synchronization
- Prometheus ServiceMonitor configuration
- Grafana dashboard configuration
- Docker Hub authentication
- CI/CD pipeline failures
🎯 Project Outcome
The final result is a working DevOps pipeline where application code can be managed through GitHub, automatically built and containerized by Jenkins, pushed to Docker Hub, deployed to Kubernetes, synchronized through Argo CD, and monitored using Prometheus and Grafana.
                    ┌───────────────┐
                    │    GitHub     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Jenkins    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Docker     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Docker Hub  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Kubernetes   │
                    └───────┬───────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       ┌───────────┐                 ┌───────────┐
       │ Argo CD   │                 │ Prometheus │
       └───────────┘                 └─────┬─────┘
                                           │
                                           ▼
                                     ┌───────────┐
                                     │  Grafana  │
                                     └───────────┘

👨‍💻 Author
Shubham Chitalkar
Electronics & Telecommunication Engineering
GitHub:
https://github.com/shubham-chitalkar

⭐ Project Status
🟢 Completed
🟢 Tested
🟢 CI/CD Working
🟢 Kubernetes Working
🟢 GitOps Working
🟢 Monitoring Working
