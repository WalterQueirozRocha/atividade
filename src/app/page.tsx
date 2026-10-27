'use client'

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { toast, Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ITENS_SANFONA = [
  {
    id: "item1",
    titulo: "item1",
    conteudo: "Item 1 sanfona"
  },
  {
    id: "item2",
    titulo: "item2",
    conteudo: "Item 2 sanfona"
  },
  {
    id: "item2",
    titulo: "item2",
    conteudo: "Item 2 sanfona"
  },
  {
    id: "item3",
    titulo: "item3",
    conteudo: "Item 3 sanfona"
  }
];

const TODOS_ITENS = Array.from({length: 12}, (_, i) => (
  {
    id: i + 1,
    nome: 'item da lista' + (i + 1),
    descricao: 'Descrição do item' + (i + 1),
  }
)
);

const ITENS_ABAS =[
  {
    valor: "aba1",
    titulo: "Aba 1",
    conteudo: "Conteudo aba 1"
  },
  {
    valor: "aba2",
    titulo: "Aba 2",
    conteudo: "Conteudo aba 2"
  },
  {
    valor: "aba3",
    titulo: "Aba 3",
    conteudo: "Conteudo aba 3"
  },
];


export default function Home() {
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const itensPorPagina = 3;
  const totalPaginas = Math.ceil(TODOS_ITENS.length / itensPorPagina);
  const itensDaPagina = TODOS_ITENS.slice(
    (paginaAtual -1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const [progresso, setProgresso] = useState<number>(40);
  const [carregando, setCarregando] = useState<boolean>(false);

  const [opcaoMenu, setOpcaoMenu] = useState<string>("nenhuma opção selecionada");

  useEffect(() => {
    if (!carregando) return;

    const timer = setInterval(() =>{
      setProgresso((atual) => {
        if(atual >= 100){
          setCarregando(false);
          toast.add({
            title: "progresso concluido",
            description: "Concluido",
            type: "success",
          });
          return 100;
        }
        return Math.min(100, atual + 10);
      });
    },400);

    return () => clearInterval(timer);
  }, [carregando]);

  const mudarPagina = (novaPagina: number) => {
    if(novaPagina >= 1 && novaPagina <= totalPaginas){
      setPaginaAtual(novaPagina);
    }
  };

  const selecionarOpcaoMenu = (opcao: string) => {
    setOpcaoMenu(opcao);
  };

    return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      <header className="border-b bg-white py-6 px-4 text-center shadow-xs">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Atividade Next
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Aplicação web responsiva com 6 componentes visuais em React / Next.js
        </p>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section
          aria-labelledby="titulo-acordeao"
          className="acordeao sanfona rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-acordeao" className="text-lg font-semibold">
              1. Acordeão (Sanfona)
            </h2>
            <p className="text-sm text-zinc-500">
              Seções de conteúdo expansíveis e colapsáveis.
            </p>
          </div>
          <Accordion defaultValue={["item-1"]} className="w-full">
            {ITENS_SANFONA.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.titulo}</AccordionTrigger>
                <AccordionContent>{item.conteudo}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section
          aria-labelledby="titulo-paginacao"
          className="paginacao rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-paginacao" className="text-lg font-semibold">
              2. Paginação
            </h2>
            <p className="text-sm text-zinc-500">
              página({paginaAtual} de {totalPaginas}).
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {itensDaPagina.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-sm"
              >
                <span className="font-medium">{item.nome}</span>
                <span className="text-zinc-500">{item.descricao}</span>
              </li>
            ))}
          </ul>
          <Pagination className="mt-auto pt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text="Anterior"
                  href="#paginacao"
                  aria-disabled={paginaAtual <= 1}
                  className={
                    paginaAtual <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    mudarPagina(paginaAtual - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                <PaginationItem key={numero}>
                  <PaginationLink
                    href="#paginacao"
                    isActive={paginaAtual === numero}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      mudarPagina(numero);
                    }}
                  >
                    {numero}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  text="Próxima"
                  href="#paginacao"
                  aria-disabled={paginaAtual >= totalPaginas}
                  className={
                    paginaAtual >= totalPaginas
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    mudarPagina(paginaAtual + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
        <section
          aria-labelledby="titulo-progresso"
          className="barra-progresso rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-progresso" className="text-lg font-semibold">
              3. Barra de Progresso
            </h2>
            <p className="text-sm text-zinc-500">
              progresso(0 a 100%).
            </p>
          </div>
          <Progress value={progresso} className="w-full">
            <ProgressLabel>Progresso</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setProgresso((v) => Math.max(0, v - 10))}
              disabled={progresso <= 0 || carregando}
            >
              -10%
            </Button>
            <Button
              variant="outline"
              onClick={() => setProgresso((v) => Math.min(100, v + 10))}
              disabled={progresso >= 100 || carregando}
            >
              +10%
            </Button>
            <Button
              onClick={() => {
                if (progresso >= 100) setProgresso(0);
                setCarregando(true);
              }}
              disabled={carregando}
            >
              {carregando ? "Carregando..." : "Simular Progresso"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setCarregando(false);
                setProgresso(0);
              }}
            >
              Resetar
            </Button>
          </div>
        </section>
        <section
          aria-labelledby="titulo-abas"
          className="abas rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-abas" className="text-lg font-semibold">
              4. Abas
            </h2>
            <p className="text-sm text-zinc-500">
              Organização de conteúdo em diferentes painéis.
            </p>
          </div>
          <Tabs defaultValue="aba-1" className="w-full">
            <TabsList className="w-full sm:w-fit">
              {ITENS_ABAS.map((aba) => (
                <TabsTrigger key={aba.valor} value={aba.valor}>
                  {aba.titulo}
                </TabsTrigger>
              ))}
            </TabsList>
            {ITENS_ABAS.map((aba) => (
              <TabsContent
                key={aba.valor}
                value={aba.valor}
                className="rounded-lg border bg-zinc-50 p-4 mt-2 text-zinc-700"
              >
                {aba.conteudo}
              </TabsContent>
            ))}
          </Tabs>
        </section>
        <section
          aria-labelledby="titulo-menu-suspenso"
          className="menu-suspenso rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-menu-suspenso" className="text-lg font-semibold">
              5. Menu Suspenso
            </h2>
            <p className="text-sm text-zinc-500">
              menu suspenso.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline">Selecionar Opção ▼</Button>}
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Opções Disponíveis</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => selecionarOpcaoMenu("Filtrar por recentes")}
                  >
                    Opção 1: Filtrar por recentes
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => selecionarOpcaoMenu("Ordenar por nome")}
                  >
                    Opção 2: Ordenar por nome
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => selecionarOpcaoMenu("Exportar relatório")}
                  >
                    Opção 3: Exportar relatório
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-sm text-zinc-600">
              Opção ativa: <strong className="text-zinc-900">{opcaoMenu}</strong>
            </p>
          </div>
        </section>
        <section
          aria-labelledby="titulo-toast"
          className="notificacao-toast rounded-xl border bg-white p-6 shadow-xs flex flex-col gap-4"
        >
          <div className="border-b pb-3">
            <h2 id="titulo-toast" className="text-lg font-semibold">
              6. Notificação Toast
            </h2>
            <p className="text-sm text-zinc-500">
              Mensagens temporárias de feedback (sucesso).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.add({
                  title: "Sucesso na operação!",
                  description: "Os dados foram salvos corretamente.",
                  type: "success",
                })
              }
            >
              Toast de Sucesso
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white py-4 px-4 text-center text-sm text-zinc-500">
        Atividade Next
      </footer>
    </div>
  );
}