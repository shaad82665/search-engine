# Search Engines (OpenSearch, Meilisearch)

##  Setup

###  OpenSearch

```sh
 cd open-search/
```

```sh
 docker-compose up
```
###  Meilisearch

```sh
 cd db-seaarch-meilisearch/
```

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
## References

### OpenSearch
Installation:
https://opensearch.org/versions/opensearch-2-1-0.html
Setup & Implementation:
https://opensearch.org/docs/latest/clients/javascript/index/
https://github.com/opensearch-project/opensearch-js/blob/HEAD/USER_GUIDE.md

AWS Managed OpenSearch Service 

https://aws.amazon.com/opensearch-service/


### Meilisearch
Installation and implementation:
https://www.meilisearch.com/docs/learn/getting_started/installation
