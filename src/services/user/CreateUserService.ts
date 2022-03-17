import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    /* console.log(name) */ //precisa verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorreto");
    }
    //verificar se esse e-mail já está em uso/cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      //vai buscar se esse email já existe no banco de dados
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("Email existente");
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
export { CreateUserService };
