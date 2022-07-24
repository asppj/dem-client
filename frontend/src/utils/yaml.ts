import YAML from 'yaml'


export function objToStrYaml(obj: any): string {
	console.log("yaml配置文件：",obj)
	return YAML.stringify(obj)
}
