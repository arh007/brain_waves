

flowchart TD
    A["Project Builder"] --> B["Laravel AI Service"]
    B --> C["Validate Input & Rate Limit"]
    C --> D["Approved AI Provider API"]
    D --> E["Structured Response"]
    E --> F["Validate Response Schema"]
    F --> G["Display Brief to User"]
    G --> H["User Reviews & Approves"]
    H --> I["Existing Inquiry Workflow"]

