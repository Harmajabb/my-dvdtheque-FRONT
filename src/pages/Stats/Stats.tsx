import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { Reveal } from "../../components/Reveal/Reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { getDvds } from "../../services/api";
import type { Dvd } from "../../types";

function Stats() {
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        // get all dvd
        const data = await getDvds(1, 1000);
        setDvds(data.dvds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-dark">
        <div className="container-custom py-8">
          <output className="block text-center py-16">
            <p className="text-xl text-zinc-300">Chargement...</p>
          </output>
        </div>
      </main>
    );
  }

  // Totaux par statut
  const total = dvds.length;
  const enCollection = dvds.filter((d) => d.statut === "en collection").length;
  const pretes = dvds.filter((d) => d.statut === "prêté").length;
  const perdus = dvds.filter((d) => d.statut === "perdu").length;

  // Genres (bar chart)
  const genreCounts: Record<string, number> = {};
  dvds.forEach((dvd) => {
    if (dvd.genre) {
      genreCounts[dvd.genre] = (genreCounts[dvd.genre] || 0) + 1;
    }
  });

  const genresData = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8) // Top 8 genres
    .map(([genre, count], index) => ({
      genre,
      count,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    }));

  // Nationalités (pour pie chart)
  const nationaliteCounts: Record<string, number> = {};
  dvds.forEach((dvd) => {
    if (dvd.nationalite) {
      nationaliteCounts[dvd.nationalite] =
        (nationaliteCounts[dvd.nationalite] || 0) + 1;
    }
  });

  const nationalitesData = Object.entries(nationaliteCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([nationalite, count], index) => ({
      nationalite,
      count,
      fill: [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ][index % 5],
    }));

  // DVDs ajoutés par mois (6 derniers mois)
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);

  const dvdsByMonth: Record<string, number> = {};
  dvds.forEach((dvd) => {
    const date = new Date(dvd.date_ajout);
    if (date >= sixMonthsAgo) {
      const monthKey = date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
      });
      dvdsByMonth[monthKey] = (dvdsByMonth[monthKey] || 0) + 1;
    }
  });

  const monthsData = Object.entries(dvdsByMonth).map(([month, count]) => ({
    month,
    count,
  }));

  // Config charts
  const genresConfig = {
    count: {
      label: "DVDs",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const nationalitesConfig = {
    count: {
      label: "DVDs",
    },
  } satisfies ChartConfig;

  const monthsConfig = {
    count: {
      label: "DVDs ajoutés",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <main className="min-h-screen bg-bg-dark">
      <div className="container-custom py-8">
        <Reveal>
          <h1 className="text-4xl font-bold text-accent mb-8"> Statistiques</h1>
        </Reveal>

        <Reveal variant="fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-400">
                  Total
                </CardDescription>
                <CardTitle className="text-4xl text-white">{total}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-400">DVDs dans la collection</p>
              </CardContent>
            </Card>

            {/* En collection */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-400">
                  En collection
                </CardDescription>
                <CardTitle className="text-4xl text-green-500">
                  {enCollection}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-zinc-400">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  {Math.round((enCollection / total) * 100)}% du total
                </div>
              </CardContent>
            </Card>

            {/* Prêtés */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-400">
                  Prêtés
                </CardDescription>
                <CardTitle className="text-4xl text-yellow-500">
                  {pretes}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-zinc-400">
                  <Calendar className="mr-1 h-4 w-4 text-yellow-500" />
                  {Math.round((pretes / total) * 100)}% du total
                </div>
              </CardContent>
            </Card>

            {/* Perdus */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-400">
                  Perdus
                </CardDescription>
                <CardTitle className="text-4xl text-red-500">
                  {perdus}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-zinc-400">
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  {Math.round((perdus / total) * 100)}% du total
                </div>
              </CardContent>
            </Card>
          </div>
        </Reveal>

        <Reveal variant="fade-in-up" delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart - Top Genres */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Top Genres</CardTitle>
                <CardDescription className="text-zinc-400">
                  Les 8 genres les plus représentés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={genresConfig}>
                  <BarChart data={genresData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis
                      dataKey="genre"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="count" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-zinc-400">
                  Total de {genresData.reduce((acc, g) => acc + g.count, 0)}{" "}
                  DVDs affichés
                </div>
              </CardFooter>
            </Card>

            {/* Pie Chart - Nationalités */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Répartition par nationalité
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Origine des films de la collection
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={nationalitesConfig}
                  className="mx-auto aspect-square max-h-[300px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={nationalitesData}
                      dataKey="count"
                      nameKey="nationalite"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-white text-3xl font-bold"
                                >
                                  {nationalitesData.length}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-zinc-400"
                                >
                                  Pays
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="grid grid-cols-2 gap-2 w-full">
                  {nationalitesData.slice(0, 4).map((nat) => (
                    <div
                      key={nat.nationalite}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: nat.fill }}
                      />
                      <span className="text-zinc-400 text-xs">
                        {nat.nationalite}: {nat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </Reveal>

        {/* ===== GRAPHIQUE TEMPOREL ===== */}
        <Reveal variant="fade-in-up" delay={400}>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">
                DVDs ajoutés au fil du temps
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Évolution de la collection (6 derniers mois)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthsConfig}>
                <AreaChart
                  data={monthsData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#3f3f46"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "#a1a1aa" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="count"
                    type="natural"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-2))"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none text-white">
                    {monthsData.length > 0 &&
                    monthsData[monthsData.length - 1].count > 0 ? (
                      <>
                        Tendance à la hausse <TrendingUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Période calme <TrendingDown className="h-4 w-4" />
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 leading-none text-zinc-400">
                    {monthsData.reduce((acc, m) => acc + m.count, 0)} DVDs
                    ajoutés ces 6 derniers mois
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}

export default Stats;
