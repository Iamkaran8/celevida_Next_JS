#!/bin/bash

echo "========================================="
echo "🔍 VPS SERVER SECURITY CHECK"
echo "========================================="
echo ""
echo "Run this script ON YOUR VPS SERVER to check for signs of compromise"
echo ""

# Check for suspicious processes
echo "1. Checking for suspicious processes..."
echo "----------------------------------------"
ps aux | grep -E "nc|ncat|socat|python|perl|ruby|wget|curl" | grep -v grep | head -20

# Check for unusual network connections
echo ""
echo "2. Checking for unusual network connections..."
echo "----------------------------------------"
netstat -tulpn 2>/dev/null | grep LISTEN || ss -tulpn | grep LISTEN

# Check cron jobs
echo ""
echo "3. Checking cron jobs..."
echo "----------------------------------------"
echo "User crontab:"
crontab -l 2>/dev/null || echo "No user crontab"
echo ""
echo "System crontabs:"
cat /etc/crontab 2>/dev/null || echo "Cannot read /etc/crontab"

# Check for unauthorized SSH keys
echo ""
echo "4. Checking SSH authorized_keys..."
echo "----------------------------------------"
cat ~/.ssh/authorized_keys 2>/dev/null || echo "No authorized_keys file"

# Check recent login attempts
echo ""
echo "5. Checking recent login attempts (last 50)..."
echo "----------------------------------------"
tail -50 /var/log/auth.log 2>/dev/null || tail -50 /var/log/secure 2>/dev/null || echo "Cannot read auth logs"

# Check for unusual users
echo ""
echo "6. Checking for unusual users..."
echo "----------------------------------------"
echo "Users with UID >= 1000 (non-system users):"
awk -F: '$3 >= 1000 {print $1, "UID:", $3}' /etc/passwd

# Check running services
echo ""
echo "7. Checking running services..."
echo "----------------------------------------"
systemctl list-units --type=service --state=running 2>/dev/null | head -20 || service --status-all 2>/dev/null | grep running | head -20

# Check for hidden files in common locations
echo ""
echo "8. Checking for suspicious hidden files in /tmp..."
echo "----------------------------------------"
find /tmp -name ".*" -type f 2>/dev/null | head -10

# Check last modified files in web directory
echo ""
echo "9. Checking recently modified files in current directory..."
echo "----------------------------------------"
find . -type f -mtime -7 -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" | head -20

# Check for crypto mining indicators
echo ""
echo "10. Checking for cryptocurrency mining indicators..."
echo "----------------------------------------"
ps aux | grep -iE "xmrig|minerd|cpuminer|ccminer|ethminer|claymore" | grep -v grep

echo ""
echo "========================================="
echo "✅ Security check complete"
echo "========================================="
echo ""
echo "⚠️  WHAT TO LOOK FOR:"
echo ""
echo "1. Suspicious processes: unknown python/perl/ruby scripts, nc/netcat listeners"
echo "2. Unexpected network connections on unusual ports"
echo "3. Unauthorized cron jobs"
echo "4. Unknown SSH keys in authorized_keys"
echo "5. Failed login attempts or successful logins from unknown IPs"
echo "6. New user accounts you didn't create"
echo "7. Cryptocurrency miners (xmrig, minerd, etc.)"
echo "8. Recently modified files you didn't change"
echo ""
echo "If you find anything suspicious:"
echo "1. Immediately disconnect the server from the internet"
echo "2. Take a snapshot/backup for forensics"
echo "3. Restore from a clean backup or rebuild the server"
echo "4. Change all passwords and SSH keys"
echo "5. Consider hiring a security professional"
echo ""
