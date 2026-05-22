#!/bin/bash
# ══════════════════════════════════════════════════════════════════════
#  EC2 Bootstrap Script — College ERP Backend
#  Run this ONCE on a fresh Ubuntu 24.04 EC2 instance.
#
#  Usage: ssh into EC2, then:
#    chmod +x ec2-setup.sh && sudo ./ec2-setup.sh
# ══════════════════════════════════════════════════════════════════════

set -euo pipefail

echo "══════════════════════════════════════════════════════════════"
echo "  College ERP — EC2 Setup Script"
echo "══════════════════════════════════════════════════════════════"

# ─── Update system packages ──────────────────────────────────────────
echo "📦 Updating system packages..."
apt-get update -y
apt-get upgrade -y

# ─── Install Docker ──────────────────────────────────────────────────
echo "🐳 Installing Docker..."
apt-get install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# ─── Enable Docker on boot ──────────────────────────────────────────
echo "⚙️  Enabling Docker to start on boot..."
systemctl enable docker
systemctl start docker

# ─── Add ubuntu user to docker group (no sudo needed for docker) ─────
echo "👤 Adding 'ubuntu' user to docker group..."
usermod -aG docker ubuntu

# ─── Install useful utilities ────────────────────────────────────────
echo "🔧 Installing utilities..."
apt-get install -y htop curl wget unzip jq

# ─── Verify installation ────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════════════════════"
echo "  ✅ Setup Complete!"
echo "══════════════════════════════════════════════════════════════"
echo ""
echo "  Docker version: $(docker --version)"
echo ""
echo "  ⚠️  IMPORTANT: Log out and log back in for docker group"
echo "     permissions to take effect:"
echo ""
echo "     exit"
echo "     ssh -i your-key.pem ubuntu@<EC2_IP>"
echo ""
echo "  Then verify docker works without sudo:"
echo "     docker ps"
echo ""
echo "══════════════════════════════════════════════════════════════"
