def build_feature_vector(
    priority: int,
    agent_load: int,
    hours_since_created: float,
    sla_hours: int
):
    return [[
        priority,
        agent_load,
        hours_since_created,
        sla_hours
    ]]
