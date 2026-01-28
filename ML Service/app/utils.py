def priority_to_int(priority: str) -> int:
    mapping = {
        "P1": 1,
        "P2": 2,
        "P3": 3,
        "P4": 4
    }
    return mapping.get(priority, 4)
