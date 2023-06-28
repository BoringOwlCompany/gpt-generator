import { Constant, Route } from '../../shared';
import services from '../services';
import controllers from '../controllers';

export const getService = <T extends keyof typeof services>(
  serviceName: T
): ReturnType<(typeof services)[T]> => {
  return strapi.plugin(Constant.PLUGIN_NAME).service(serviceName);
};

interface IGetRouteOptions<T extends keyof typeof controllers> {
  method: 'GET' | 'POST';
  path: `${Route}`;
  handler: {
    controller: T;
    controllerMethod: keyof ReturnType<(typeof controllers)[T]>;
  };
  auth?: boolean;
}

export const getRoute = <T extends keyof typeof controllers>({
  method,
  path,
  handler: { controller, controllerMethod },
  auth = true,
}: IGetRouteOptions<T>) => ({
  method,
  path,
  handler: `${controller}.${controllerMethod.toString()}`,
  ...(auth === false && {
    config: {
      auth,
    },
  }),
});
