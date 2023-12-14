import { PrismaClient } from "@prisma/client";


declare global{
    var prisma: PrismaClient | undefined
}

//This is done to avoid multiple instantiation of the db instance
//This follows the SingleTon pattern where the instance of the object is created only if it not present, 
//only once

export const db = globalThis.prisma || new PrismaClient();
globalThis.prisma = db;