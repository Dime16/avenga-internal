import boto3
import copy
import time
import sys

CLUSTER_NAME = sys.argv[1]
SERVICE_NAME = sys.argv[2]

ecs = boto3.client("ecs", region_name="ca-central-1")

def get_current_task_def_arn():
    service = ecs.describe_services(cluster=CLUSTER_NAME, services=[SERVICE_NAME])['services'][0]
    return service['taskDefinition']

def get_task_definition(task_def_arn):
    return ecs.describe_task_definition(taskDefinition=task_def_arn)['taskDefinition']

def register_new_task_def(base_def):
    container_defs = base_def['containerDefinitions']

    for c in container_defs:
        image_name = c['image'].split(":")[0]
        c['image'] = f"{image_name}:latest"

    register_args = {
        'family': base_def['family'],
        'executionRoleArn': base_def.get('executionRoleArn'),
        'networkMode': base_def['networkMode'],
        'containerDefinitions': container_defs,
        'volumes': base_def.get('volumes', []),
        'placementConstraints': base_def.get('placementConstraints', []),
        'requiresCompatibilities': base_def.get('requiresCompatibilities', []),
        'cpu': base_def.get('cpu'),
        'memory': base_def.get('memory'),
        'runtimePlatform': base_def.get('runtimePlatform'),
    }
    if base_def.get('taskRoleArn'):
        register_args['taskRoleArn'] = base_def['taskRoleArn']

    response = ecs.register_task_definition(**register_args)

    return response['taskDefinition']['taskDefinitionArn']

def update_desired_count(count, task_def_arn):
    ecs.update_service(
        cluster=CLUSTER_NAME,
        service=SERVICE_NAME,
        taskDefinition=task_def_arn,
        desiredCount=count
    )
    print(f"Set desired count to {count} for task definition {task_def_arn}")

def main():
    print("Fetching current task definition...")
    current_task_def_arn = get_current_task_def_arn()
    current_task_def = get_task_definition(current_task_def_arn)

    print("Registering new task definition revision with latest image tags...")
    new_task_def_arn = register_new_task_def(current_task_def)

    print("Updating ECS service to use new task definition...")
    print("Stopping running tasks...")
    update_desired_count(0, new_task_def_arn)

    time.sleep(10)

    print("Starting service with new task...")
    update_desired_count(1, new_task_def_arn)

    print("Done.")

if __name__ == "__main__":
    main()
