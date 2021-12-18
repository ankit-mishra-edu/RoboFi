# Generated by Django 3.2.8 on 2021-11-27 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='microbot',
            name='Authors',
            field=models.ManyToManyField(to='automation.Author'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Dependencies',
            field=models.ManyToManyField(to='automation.Dependency'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Inputs',
            field=models.ManyToManyField(to='automation.Input'),
        ),
        migrations.AlterField(
            model_name='microbot',
            name='Outputs',
            field=models.ManyToManyField(to='automation.Output'),
        ),
    ]