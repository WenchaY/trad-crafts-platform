# How-to-Fix-It (Problem-solving guide)

### 1. Ports are not available
**Problem**
`docker-compose`起動時に以下のエラー発生：
```bash
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:8080 -> 0.0.0.0:0: listen tcp 0.0.0.0:8080: 
bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```
**Solve**
```bash
Run as administrator or root

net stop winnat
docker-compose up
net start winnat
```
