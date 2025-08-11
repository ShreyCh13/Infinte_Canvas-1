SHELL := /usr/bin/env bash

.PHONY: dev db test

dev:
	pnpm dev

db:
	pnpm db:gen && pnpm db:migrate && pnpm db:seed

test:
	pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e



