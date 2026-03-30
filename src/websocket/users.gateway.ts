import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersService } from "../modules/user/user.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UsersGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  // Client emits: socket.emit('get_users')
  @SubscribeMessage("get_users")
  handleGetUsers(@ConnectedSocket() client: Socket) {
    const users = this.usersService.findAll();

    // Option 1: return response directly
    return {
      event: "users_list",
      data: users,
    };

    // Option 2: emit manually
    // client.emit('users_list', users);
  }
}
