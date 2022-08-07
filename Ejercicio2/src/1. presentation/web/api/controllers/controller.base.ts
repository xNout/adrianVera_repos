import { Router } from "express";

export interface IController
{
    Build(): Router;
}