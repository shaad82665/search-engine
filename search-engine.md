# Search Engines (OpenSearch, Meilisearch)

## Setup

### OpenSearch

```sh
 cd open-search/
```

```sh
 docker-compose up
```

### Meilisearch

```sh
# Fetch the latest version of Meilisearch image from DockerHub
docker pull getmeili/meilisearch:v1.3
```

```sh
# Launch Meilisearch in development mode with a master key
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v $(pwd)/db-seaarch-meilisearch/meili_data:/meili_data \
    getmeili/meilisearch:v1.3
# Use ${pwd} instead of $(pwd) in PowerShell
```

## Run Search Script

```sh
 npm run search
```

## Run Batch Search Script In Multiple Rounds

```sh
 npm run batch-search <rounds> <batch-size>
```

[rounds]: number of search rounds (default: 5)
[batch-size]: batch size (default: 200)
e.g.

```sh
 npm run batch-search 2 200
```

### Zinsearch

```sh
mkdir data
```

```sh
docker run -v /Users/mohd.shadab/Desktop/Cropsly-local/zinc-search/data:/data -e ZINC_DATA_PATH="/data" -p 4080:4080 \
    -e ZINC_FIRST_ADMIN_USER=admin -e ZINC_FIRST_ADMIN_PASSWORD=Complexpass#123 \
-e ZINC_TELEMETRY=true -e ZINC_PROMETHEUS_ENABLE=true   --name zincsearch public.ecr.aws/zinclabs/zincsearch:latest
```

## References

movies.json file
[Download movies.json](https://drive.google.com/file/d/1UtGX8WdnPWBQExr2KEIcNkb1C1te8Mq5/view)

### OpenSearch

Installation:
[OpenSearch Installation Guide](https://opensearch.org/versions/opensearch-2-1-0.html)

Setup & Implementation:
[OpenSearch JavaScript Client Guide](https://opensearch.org/docs/latest/clients/javascript/index/)
[OpenSearch JavaScript Client User Guide](https://github.com/opensearch-project/opensearch-js/blob/HEAD/USER_GUIDE.md)

AWS Managed OpenSearch Service
[AWS Managed OpenSearch Service](https://aws.amazon.com/opensearch-service/)

### Meilisearch

Installation and implementation:
[Meilisearch Guide](https://www.meilisearch.com/docs/learn/getting_started/installation)
