import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { CreateUserDto } from "./dtos/create-user.dto";

// pipes are functions that is used to transform the input data to the desired format
// pipes are used to validate the input data before it reaches the controller
// used to clean and sanitize the input data and convert it to the specific format that ensures
// that the data before reaching the controller is in the correct format

@Controller('/api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Get()
    // getAllUsers(): User[] {
    //     return this.usersService.getAllUsers();
    // }

    @Get()
    getAllUsers(@Query() queryParameters: any): User[] {

        console.log(queryParameters);

        if (queryParameters.gender) {
            return this.usersService.getAllUsers().filter(user => user.gender?.toLowerCase() === queryParameters.gender.toLowerCase());
        }

        return this.usersService.getAllUsers();
    }

    @Get('/usersv2')
    getV2Users(@Query('gender') gender: string): User[] {
        return this.usersService.getAllUsers().filter(user => user.gender?.toLowerCase() == gender.toLowerCase());
    }

    // @Post()
    // createNewUser(@Body() user: User): User[] {
    //     var allUsersCount = this.usersService.getAllUsers().length;
    //     user.id = (allUsersCount + 1).toString();
    //     this.usersService.createUser(user);
    //     return this.usersService.getAllUsers();
    // }

    // @Get(':id/:name/:gender')
    // getUserById(@Param() parameters: any): void {
    //     console.log(parameters);
    // }


    @Get(':id')
    getUserById(@Param('id') id: string): User | undefined {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userForUpdatePayload: UpdateUserDto): boolean {
        return this.usersService.updateUser(id, userForUpdatePayload);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): User[] {
        var isDeleted = this.usersService.deleteUser(id);
        return this.usersService.getAllUsers();
    }

    // Data Transformation: Class transformers allow you to transform plain JavaScript objects into instances of classes. This is useful when you want to ensure that the data you are working with adheres to a specific structure or class.

    //Validation: When combined with class validators, class transformers can help validate incoming data. This ensures that the data meets certain criteria before it is processed by your application.

    //Serialization/Deserialization: Class transformers can be used to serialize class instances into plain objects or JSON, and deserialize plain objects or JSON into class instances. This is particularly useful when dealing with data transfer objects (DTOs) in APIs.

    //Type Safety: By transforming data into class instances, you can leverage TypeScript's type safety features. This helps catch errors at compile time and makes your code more robust.
    
    @Post()
    createNewUser(@Body(new ValidationPipe()) userForCreate: CreateUserDto): User[] {
        return this.usersService.getAllUsers();
    }



}