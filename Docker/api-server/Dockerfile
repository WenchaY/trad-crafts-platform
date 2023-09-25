FROM python:3.10-slim-bullseye
LABEL version="1.0"
LABEL description="Traditional Crafts Platform API Server"
LABEL maintainer "Zhong Houji"
WORKDIR /api-server
ARG PROTOC_VERSION=21.6

# setup
RUN apt update && \
	apt install --assume-yes --no-install-recommends \
	build-essential \
	vim cmake wget unzip && \
	ln -sf  /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# python app setup
ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	PYTHONUTF8=1 \
	PIP_NO_CACHE_DIR=off \
	PIP_DISABLE_PIP_VERSION_CHECK=on \
	PYTHONPATH="/api-server:$PYTHONPATH"

# poetryインストール
RUN pip install poetry
COPY api-server/ ./
# パッケージインストール
RUN if [ -f pyproject.toml ]; then poetry install --no-root; fi

# entry point
ENTRYPOINT [ "poetry", "run" ]
CMD ["python", "-u", "src/index.py"]
