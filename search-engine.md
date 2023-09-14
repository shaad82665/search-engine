# Search Engines (OpenSearch, Meilisearch and Zincsearch)

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

## Run Search Script(Meilisearch and Opensearch)

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

##### Run zinc

```sh
mkdir data
```

```sh
docker run -v /Users/mohd.shadab/Desktop/Cropsly-local/zinc-search/data:/data -e ZINC_DATA_PATH="/data" -p 4080:4080 \
    -e ZINC_FIRST_ADMIN_USER=admin -e ZINC_FIRST_ADMIN_PASSWORD=Complexpass#123 \
-e ZINC_TELEMETRY=false -e ZINC_PROMETHEUS_ENABLE=true   --name zincsearch public.ecr.aws/zinclabs/zincsearch:latest
```

##### Load existing data [download](https://drive.google.com/file/d/1u36H7buPIa-GzwjzobIVNsdskrIaZ0KF/view)

```sh
cd /path/to/ndjsonData
```

```sh
curl http://localhost:4080/api/_bulk -i -u admin:Complexpass#123  --data-binary "@data.ndjson"
```

##### Insert real time data

```sh
curl -X PUT "http://localhost:4080/api/movies/_doc/901" -u admin:Complexpass#123 -H "Content-Type: application/json" -d '{
  "title": "Death Not 3.0",
  "overview": "overview",
  "genres": ["Action", "Hentai"],
  "poster": "https://image.tmdb.org/t/p/w500/91O7z0vo7MiNWd5xD2BoivwbQsb.jpg",
  "release_date": 1084665600
}'
```

##### Run Search Script(Zincsearch)

```sh
 npm run zincsearch
```

##### Search

```sh
curl -u admin:Complexpass#123 -X POST "http://localhost:4080/api/movies/_search" -H "Content-Type: application/json" -d '{
    "search_type": "match",
    "query": {
        "term": "hero",
        "field": "_all"
    }
}'

```

## References

[Download movies.json](https://drive.google.com/file/d/1UtGX8WdnPWBQExr2KEIcNkb1C1te8Mq5/view)

[Download ndjson data for zincsearch](https://drive.google.com/file/d/1u36H7buPIa-GzwjzobIVNsdskrIaZ0KF/view)

### OpenSearch

[OpenSearch Installation Guide](https://opensearch.org/versions/opensearch-2-1-0.html)

[OpenSearch JavaScript Client Guide](https://opensearch.org/docs/latest/clients/javascript/index/)
[OpenSearch JavaScript Client User Guide](https://github.com/opensearch-project/opensearch-js/blob/HEAD/USER_GUIDE.md)

[AWS Managed OpenSearch Service](https://aws.amazon.com/opensearch-service/)

### Meilisearch

[Meilisearch Guide](https://www.meilisearch.com/docs/learn/getting_started/installation)

### Zincsearch

[Zincsearch Docs](https://zincsearch-docs.zinc.dev/)
[Github](https://github.com/zincsearch/zincsearch)
