db.record.aggregate([
//    { $match: { id: "638de13b-fc93-46d8-b2e2-d240235c8fc9" } },

    { $lookup: {
        from: "user",
        let: { userId: "$userId" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id", "$$userId"] } } },
            { $project: { _id: 0, id: 1, name: 1, email: 1 } }
            ],
        as: "user"
        }},

    { $lookup: {
        from: "client",
        let: { clientId: "$clientId" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id", "$$clientId"] } } },
            { $project: { _id: 0, id: 1, name: 1, phoneNumber: 1, email: 1 } }
            ],
        as: "client"
        }},

    { $lookup: {
        from: "batch",
        let: { batchId: "$batchId" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id", "$$batchId"] } } },
            { $project: { _id: 0, id: 1, name: 1, area: 1 } }
            ],
        as: "batch"
        }},

    { $lookup: {
        from: "organization",
        let: { organizationId: "$organizationId" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id", "$$organizationId"] } } },
            { $project: { _id: 0, id: 1, name: 1, cnpj: 1 } }
            ],
        as: "organization"
        }},

    { $lookup: {
        from: "prague",
        let: { pragueId: "$pragueId" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id", "$$pragueId"] } } },
            { $project: { _id: 0, id: 1, comumName: 1, cientificName: 1 } }
            ],
        as: "prague"
        }},



    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$batch", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$organization", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$prague", preserveNullAndEmptyArrays: true } },

    { $unwind: "$user" },
    { $project: {
        id: 1,
        dataHora: 1,
        observation: 1,
        developmentStatus: 1,
        evaluatedPlantsCount: 1,
        attackedPlantsCount: 1,
        infestationPercentage: 1,
        investmentLevel: 1,
        createAt: 1,
        user: {
            id: "$user.id",
            name: "$user.name",
            email: "$user.email"
            },
        client: {
            id: "$client.id",
            name: "$client.name",
            phoneNumber: "$client.phoneNumber",
            email: "$client.email"
            },

        batch: {
            id: "$batch.id",
            name: "$batch.name",
            area: "$batch.area"
            },
        organization: {
            id: "$organization.id",
            name: "$organization.name",
            cnpj: "$organization.cnpj"
            },
        prague: {
            id: "$prague.id",
            name: "$prague.comumName",
            cnpj: "$prague.cientificName"
            }
        }
        }
    ]);


    db.client.findOne({}, { _id: "68ffdb9741c88f0b0da2dfef", id: "16b37ed4-35e5-48ba-acca-183df1c913ea" });

    // Evolução da Infestação (gráfico de linha)
    db.record.aggregate([
        {
            $lookup: {
                from: "batch",
                localField: "batchId",
                foreignField: "id",
                as: "batchInfo"
                }
            },
        { $unwind: "$batchInfo" },
        { $sort: { dataHora: 1 } },
        {
            $group: {
                _id: "$batchId",
                data: { $push: { x: "$dataHora", y: "$infestationPercentage" } },
                nomeLote: { $first: "$batchInfo.name" }
                }
            }
        ]);

    // Média de Infestação por Cliente (gráfico de barras)
    db.record.aggregate([
        { $group: {
            _id: "$clientId",
            mediaInfestacao: { $avg: "$infestationPercentage" }
            }},
        { $lookup: {
            from: "client",
            localField: "_id",
            foreignField: "id",
            as: "cliente"
            }},
        { $unwind: "$cliente" },
        { $project: {
            _id: 0,
            cliente: "$cliente.name",
            mediaInfestacao: 1
            }}
        ]);

    // Distribuição de Status de Desenvolvimento (gráfico de pizza)
    db.record.aggregate([
        {
            $group: {
                _id: "$developmentStatus",
                total: { $sum: 1 }
                }
            },
        {
            $project: {
                _id: 0,
                status: "$_id",
                total: 1
                }
            }
        ]);



    db.record.aggregate([
        { $match: { pragueId: { $exists: true, $ne: null } } },
        { $lookup: {
            from: "prague",
            localField: "pragueId",
            foreignField: "id",
            as: "prague"
            }},
        { $unwind: { path: "$prague", preserveNullAndEmptyArrays: true } },
        { $project: { id: 1, prague: 1 } }
        ]);
