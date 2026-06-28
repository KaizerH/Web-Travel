# Hướng dẫn Deploy lên Hostinger VPS

## 1. Push lên GitHub

```bash
cd linh-dinh-travel
git init
git add .
git commit -m "Initial commit: Linh Đình Travel website"
git remote add origin https://github.com/YOUR_USERNAME/linh-dinh-travel.git
git push -u origin main
```

## 2. Cài đặt trên Hostinger VPS

SSH vào server:
```bash
ssh root@YOUR_VPS_IP
```

Cài Node.js + PM2 + Nginx:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2
apt-get install -y nginx
```

Cài MongoDB:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt-get update && apt-get install -y mongodb-org
systemctl start mongod && systemctl enable mongod
```

Clone project:
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/linh-dinh-travel.git
cd linh-dinh-travel
npm install
```

Tạo file .env.local:
```bash
nano .env.local
# Điền:
# MONGODB_URI=mongodb://localhost:27017/linh-dinh-travel
# NEXTAUTH_SECRET=your-random-secret-64-chars
# NEXTAUTH_URL=https://yourdomain.com
# ADMIN_EMAIL=your@email.com
# ADMIN_PASSWORD=YourSecurePassword
```

Build và start:
```bash
npm run build
pm2 start npm --name "linh-dinh-travel" -- start
pm2 save && pm2 startup
```

## 3. Cấu hình Nginx

```bash
nano /etc/nginx/sites-available/linh-dinh-travel
```

Nội dung:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/linh-dinh-travel /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 4. Cài SSL (HTTPS)

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 5. Upload ảnh

Copy file logo và ảnh lên server:
```bash
scp public/logo.png root@YOUR_VPS_IP:/var/www/linh-dinh-travel/public/
scp public/images/* root@YOUR_VPS_IP:/var/www/linh-dinh-travel/public/images/
```

Sau đó rebuild:
```bash
npm run build && pm2 restart linh-dinh-travel
```
